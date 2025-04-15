<script setup lang="ts">
import { ref } from 'vue'
import type { Role, PermissionNode } from '@/types/role'
import { getAllPermissionAPI, addRoleAPI, editRoleAPI } from '@/api/role'
import { ElMessage } from 'element-plus'
import { nextTick } from 'vue'

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
  await nextTick()
  if (role) {
    defaultCheckedKeys.value = role.permissions || []
    treeRef.value?.setCheckedKeys(defaultCheckedKeys.value)
  } else {
    defaultCheckedKeys.value = []
  }
  visible.value = true
}

// 加载权限数据
const loadPermissions = async () => {
  const res = await getAllPermissionAPI()
  permissionsTree.value = res.data.data || []
  console.log('权限数据:', res.data)
}
const customNodeClass = (data: PermissionNode) => {
  if ('children' in data) {
    return data.isPenultimate ? 'is-penultimate' : ''
  }
  return ''
}

const handleSave = async () => {
  const checkedKeys = treeRef.value.getCheckedKeys()
  if (!currentRole.value?.name) {
    return ElMessage.error('角色名称不能为空')
  }
  try {
    if (isEditMode.value && currentRole.value.id) {
      await editRoleAPI(currentRole.value.id, {
        name: currentRole.value.name,
        remark: currentRole.value.remark,
        status: currentRole.value.status,
        permissions: checkedKeys
      })
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
  <el-drawer v-model="visible" :title="isEditMode ? '编辑角色' : '新增角色'" size="35%">
    <el-form v-if="currentRole" label-width="100px">
      <el-form-item label="角色名称" required>
        <el-input v-model="currentRole.name" :disabled="isEditMode" id="roleName" />
      </el-form-item>
      <el-form-item label="角色状态">
        <el-radio-group v-model="currentRole.status" id="roleStatus">
          <el-radio :value="true">启用</el-radio>
          <el-radio :value="false">禁用</el-radio>
        </el-radio-group>
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
          style="width: 400px"
          ref="treeRef"
          :data="permissionsTree"
          show-checkbox
          node-key="value"
          default-expand-all
          :expand-on-click-node="false"
          :default-checked-keys="defaultCheckedKeys"
          :props="{
            children: 'children',
            label: 'label',
            class: customNodeClass
          }"
          class="permission-tree"
        >
          <template #default="{ data }">
            <div class="tree-node-content">
              <i v-if="data.icon" :class="['iconfont', data.icon]" style="margin-right: 6px"></i>
              <span>{{ data.label }}</span>
            </div>
          </template>
        </el-tree>
      </el-form-item>
    </el-form>
    <div class="form-action-buttons">
      <el-button @click="visible = false">取消 </el-button>
      <el-button type="primary" @click="handleSave">确认 </el-button>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
.el-form {
  margin-top: -20px;
}
.form-action-buttons {
  display: flex;
  justify-content: flex-end;
}
.permission-tree {
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  padding: 2px 0;
  font-size: 13px;
  :deep(.el-tree-node__content) {
    height: auto;
  }
  :deep(.is-penultimate) {
    .el-tree-node__children {
      display: flex;
      flex-wrap: wrap;
      .el-tree-node {
        &__content {
          height: auto;
          padding: 0 4px !important;
        }
      }
    }
  }

  .iconfont {
    font-size: 13px;
  }
}
</style>
