<script setup lang="ts">
import { ref } from 'vue'
import type { Role, PermissionNode } from '@/types/role'
import { getAllPermissionAPI, addRoleAPI, editRoleAPI } from '@/api/role'
import { ElMessage } from 'element-plus'
import { nextTick } from 'vue'

const visible = ref(false)
const treeRef = ref()
const permissionsTree = ref<PermissionNode[]>([])
const defaultCheckedKeys = ref<string[]>([])

const formModel = ref<Partial<Role & { name: string }>>({
  name: '' as string,
  remark: '',
  status: true,
  permissions: []
})
const open = async (role?: Role) => {
  await loadPermissions()
  visible.value = true

  await nextTick()
  if (role?.id) {
    formModel.value = { ...role }
    defaultCheckedKeys.value = role.permissions || []
    treeRef.value?.setCheckedKeys(defaultCheckedKeys.value)
  } else {
    formModel.value = {
      name: '',
      remark: '',
      status: true,
      permissions: []
    }
    defaultCheckedKeys.value = []
    treeRef.value?.setCheckedKeys([])
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

const emit = defineEmits(['success'])
const handleSave = async () => {
  const checkedKeys = treeRef.value.getCheckedKeys()
  if (!formModel.value?.name) {
    return ElMessage.error('角色名称不能为空')
  }
  try {
    if (formModel.value.id) {
      await editRoleAPI(formModel.value.id, {
        ...formModel.value,
        permissions: checkedKeys
      })
      ElMessage.success('修改成功')
    } else {
      await addRoleAPI({
        name: formModel.value.name,
        remark: formModel.value.remark || '',
        status: formModel.value.status ?? true,
        permissions: checkedKeys
      })
      ElMessage.success('添加成功')
    }
    visible.value = false
    emit('success', formModel.value.id ? 'edit' : 'add')
  } catch (error) {
    console.error('保存失败:', error)
  }
}

defineExpose({ open })
</script>

<template>
  <el-drawer v-model="visible" :title="formModel.id ? '编辑角色' : '新增角色'" size="460px">
    <el-form :model="formModel" label-width="100px">
      <el-form-item prop="name" label="角色名称" required>
        <el-input v-model="formModel.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item prop="status" label="角色状态">
        <el-radio-group v-model="formModel.status">
          <el-radio :value="true">启用</el-radio>
          <el-radio :value="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色备注" prop="remark">
        <el-input
          v-model="formModel.remark"
          type="textarea"
          placeholder="请输入备注信息"
          :rows="2"
        />
      </el-form-item>

      <el-form-item label="权限分配" prop="permissions">
        <el-tree
          v-model="formModel.permissions"
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
    <template #footer>
      <div class="form-action-buttons">
        <el-button @click="visible = false">取消 </el-button>
        <el-button type="primary" @click="handleSave">确认 </el-button>
      </div>
    </template>
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
          padding: 0 0px !important;
        }
      }
    }
  }

  .iconfont {
    font-size: 13px;
  }
}
</style>
