<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
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
	</cl-crud>
</template>

<script lang="ts" name="share-task_record" setup>
import { useCrud, useTable } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "商品名称", prop: "goodName" },
		{
			label: "图片",
			prop: "pics",
			width: 210,
			component: { name: "cl-image", props: { size: 50 } }
		},
		{ label: "文案", prop: "text" },
		{ label: "用户", prop: "userName" },
		{ label: "备注", prop: "remark" },
		{ label: "创建时间", prop: "createTime" },
		{ type: "op", buttons: ["delete"], width: 80 }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.share.task_record
	},
	(app) => {
		app.refresh();
	}
);
</script>
