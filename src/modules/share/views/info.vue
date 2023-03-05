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

<script lang="ts" name="share-info" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "商品ID", prop: "goodId", required: true, component: { name: "el-input" } },
		{ label: "商品名称", prop: "goodName", required: true, component: { name: "el-input" } },
		{
			label: "图片",
			prop: "pics",
			component: { name: "cl-upload", props: { listType: "picture-card", multiple: true } },
			required: true
		},
		{ label: "价格", prop: "prices", required: true, component: { name: "el-input" } }
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "商品ID", prop: "goodId" },
		{ label: "商品名称", prop: "goodName" },
		{
			label: "图片",
			prop: "pics",
			width: 210,
			component: { name: "cl-image", props: { size: 50 } }
		},
		{ label: "价格", prop: "prices" },
		{ label: "创建时间", prop: "createTime" },
		{ label: "更新时间", prop: "updateTime" },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.share.info
	},
	(app) => {
		app.refresh();
	}
);
</script>
