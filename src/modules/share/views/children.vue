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
		<cl-upsert ref="Upsert" :onInfo="onInfo" />
	</cl-crud>
</template>

<script lang="ts" name="share-children" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { ref } from "vue";
import { useCool } from "/@/cool";

const { service } = useCool();

const groupOption = ref<any[]>([]);

function getGroupOption(val = "") {
	service.share.group.list({ keyWord: val }).then((res) => {
		groupOption.value = res.map((item: any) => ({
			label: item.name,
			value: item.id
		}));
	});
}

function onInfo(data: Eps.ShareInfoEntity, { next }: any) {
	groupOption.value = [{ value: data.groupId, label: data.groupName }];
	next(data);
}

// cl-upsert 配置
const Upsert = useUpsert({
	onOpen(data) {
		if (!data.groupId) {
			getGroupOption();
		}
	},
	items: [
		{ label: "子用户", prop: "name", required: true, component: { name: "el-input" } },
		{ label: "用户", prop: "userId", required: true, component: { name: "el-input" } },
		{
			label: "分组",
			prop: "groupId",
			required: true,
			component: {
				name: "el-select",
				options: groupOption,
				props: {
					filterable: true,
					remote: true,
					"remote-method": getGroupOption
				}
			}
		}
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "子账号", prop: "name" },
		{ label: "用户", prop: "username" },
		{ label: "分组", prop: "groupName" },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.share.children
	},
	(app) => {
		app.refresh();
	}
);
</script>
