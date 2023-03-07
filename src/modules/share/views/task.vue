<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-input prop="userName" />
			<cl-input prop="groupName" />
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
		<cl-upsert ref="Upsert" :onInfo="onInfo" />
	</cl-crud>
</template>

<script lang="ts" name="share-task" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { ref } from "vue";
import { useCool } from "/@/cool";

const { service } = useCool();

const goodOptions = ref<any[]>([]);

function getGoodList(val: string) {
	service.share.info.list({ keyWord: val }).then((res) => {
		goodOptions.value = res.map((item: any) => ({
			label: item.goodName,
			value: item.goodId
		}));
	});
}

function onInfo(data: Eps.ShareInfoEntity, { next }: any) {
	goodOptions.value = [{ value: data.goodId, label: data.goodName }];
	next(data);
}

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{
			label: "商品",
			prop: "goodId",
			required: true,
			component: {
				name: "el-select",
				options: goodOptions,

				on: {
					change: () => {
						console.log(99999);
					}
				},
				props: {
					filterable: true,
					remote: true,
					"remote-method": getGoodList
				}
			}
		},
		{
			label: "用户",
			prop: "username",
			component: { name: "el-input", props: { disabled: true } }
		},
		{ label: "分组", prop: "groupId", component: { name: "el-select" } },
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
		{
			label: "图片",
			prop: "pics",
			width: 210,
			component: { name: "cl-image", props: { size: 50 } }
		},
		{ label: "文案", prop: "text" },
		{ label: "执行时间", prop: "actionTime" },
		{ label: "重复", prop: "repeat" },
		{ label: "用户", prop: "userName" },
		{ label: "分组", prop: "groupName" },
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
