<script setup lang="ts">
import { ref } from 'vue'
import type { Role, PermissionNode } from '@/types/role'
import { getAllPermissionAPI, addRoleAPI, editRoleAPI, getRolePermissionsAPI } from '@/api/role'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['refresh'])
const visible = ref(false)
const treeRef = ref()
const currentRole = ref<Role | null>(null)
const permissionsTree = ref<PermissionNode[]>([])
const defaultCheckedKeys = ref<string[]>([])
const isEditMode = ref(false)

const open = async (role?: Role) => {
  await loadPermissions()
  isEditMode.value = !!role
  currentRole.value = role
    ? { ...role }
    : {
        id: '',
        name: '',
        remark: '',
        status: true,
        createdAt: '',
        permissions: []
      }

  if (role) {
    const res = await getRolePermissionsAPI(role.id)
    defaultCheckedKeys.value = res.data
  } else {
    defaultCheckedKeys.value = []
  }
  visible.value = true
}

// 加载权限数据
const loadPermissions = async () => {
  const res = await getAllPermissionAPI()
  permissionsTree.value = res.data
}

const handleSave = async () => {
  const checkedKeys = treeRef.value.getCheckedKeys()
  if (!currentRole.value?.name) {
    return ElMessage.error('角色名称不能为空')
  }
  try {
    if (isEditMode.value && currentRole.value.id) {
      await editRoleAPI(currentRole.value.id, { ...currentRole.value, permissions: checkedKeys })
    } else {
      await addRoleAPI({ ...currentRole.value, permissions: checkedKeys })
    }
    visible.value = false
    emit('refresh')
    ElMessage.success(isEditMode.value ? '修改成功' : '新增成功')
  } catch (error) {
    console.error('保存失败:', error)
  }
}

defineExpose({ open })
</script>

<template>
  <el-drawer v-model="visible" :title="isEditMode ? '编辑角色' : '新增角色'" size="40%">
    <el-form v-if="currentRole" label-width="100px">
      <el-form-item label="角色名称" required>
        <el-input v-model="currentRole.name" :disabled="isEditMode" />
      </el-form-item>
      <el-form-item label="角色状态">
        <el-select v-model="currentRole.status">
          <el-option label="启用" value="true" />
          <el-option label="禁用" value="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色备注">
        <el-input
          v-model="currentRole.remark"
          type="textarea"
          placeholder="请输入备注信息"
          :rows="3"
        />
      </el-form-item>

      <el-form-item label="权限分配">
        <el-tree
          ref="treeRef"
          :data="permissionsTree"
          show-checkbox
          node-key="value"
          :default-checked-keys="defaultCheckedKeys"
          :props="{
            children: 'children',
            label: 'label'
          }"
          class="permission-tree"
        >
        </el-tree>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSave"
          >{{ isEditMode ? '保存修改' : '创建角色' }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
.permission-tree {
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  max-height: 60vh;
  overflow-y: auto;
}
</style>
