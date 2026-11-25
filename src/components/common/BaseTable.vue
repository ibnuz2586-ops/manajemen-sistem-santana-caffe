<script setup>
defineProps({ columns: { type: Array, required: true }, rows: { type: Array, default: () => [] }, emptyText: { type: String, default: 'Belum ada data tersedia.' } })
defineEmits(['row-action'])
</script>
<template>
  <div class="table-wrapper">
    <table class="data-table">
      <thead><tr><th v-for="col in columns" :key="col.key">{{ col.label }}</th><th v-if="$slots.actions">Aksi</th></tr></thead>
      <tbody>
        <tr v-if="!rows.length"><td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="empty-cell">{{ emptyText }}</td></tr>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="col in columns" :key="col.key"><slot :name="`cell-${col.key}`" :row="row">{{ row[col.key] }}</slot></td>
          <td v-if="$slots.actions" class="actions-cell"><slot name="actions" :row="row" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.table-wrapper { width: 100%; overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { text-align: left; padding: 11px 14px; background-color: var(--color-bg); color: var(--color-primary); font-weight: 600; border-bottom: 1px solid var(--color-border); white-space: nowrap; }
.data-table td { padding: 12px 14px; border-bottom: 1px solid var(--color-border); vertical-align: middle; }
.data-table tbody tr:hover { background-color: #fcfaf7; }
.empty-cell { text-align: center; color: var(--color-text-muted); padding: 28px 14px !important; }
.actions-cell { white-space: nowrap; }
</style>
