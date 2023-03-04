<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="share-task" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "商品ID", prop: "goodId", required: true, component: { name: "el-input" } },
		{ label: "用户ID", prop: "userId", required: true, component: { name: "el-input" } },
		{ label: "分组ID", prop: "groupId", required: true, component: { name: "el-input" } },
		{
			label: "执行时间",
			prop: "actionTime",
			component: {
				name: "el-date-picker",
				props: { type: "datetime", valueFormat: "YYYY-MM-DD HH:mm:ss" }
			},
			required: true
		},
		{ label: "价格比例", prop: "scale", required: true, component: { name: "el-input" } },
		{ label: "文案", prop: "text", component: { name: "cl-editor-wang" }, required: true }
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "商品名称", prop: "goodName" },
		{ label: "用户", prop: "userName" },
		{ label: "分组", prop: "groupName" },
		{ label: "执行时间", prop: "actionTime" },
		{ label: "价格比例", prop: "scale" },
		{ label: "文案", prop: "text" },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.share.task
	},
	(app) => {
		app.refresh();
	}
);
</script>
