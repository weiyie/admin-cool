<template>
	<div
		class="cl-image"
		:class="{ 'show-all': showAll }"
		:style="{
			justifyContent: justify,
			height: lazy ? style.h : 'auto'
		}"
	>
		<el-image
			v-for="(img, index) in showUrls"
			:key="img + index"
			:src="img"
			:fit="fit"
			:lazy="lazy"
			:initial-index="showIndex"
			:preview-src-list="urls"
			:style="{
				height: style.h,
				width: style.w
			}"
			preview-teleported
			@click="changeIndex(index)"
		>
			<template #error>
				<div class="image-slot">
					<el-icon :size="20"><picture-filled /></el-icon>
				</div>
			</template>
		</el-image>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { isArray, isNumber, isString } from "lodash-es";
import { PictureFilled } from "@element-plus/icons-vue";
import { imageProps } from "element-plus";
import { parsePx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-image",

	components: {
		PictureFilled
	},

	props: {
		modelValue: [String, Array],
		src: [String, Array],
		size: {
			type: [Number, Array],
			default: 100
		},
		lazy: {
			type: Boolean,
			default: false
		},
		showAll: {
			type: Boolean,
			default: true
		},
		fit: {
			type: imageProps.fit.type,
			default: "cover"
		},
		justify: {
			type: String,
			default: "center"
		}
	},

	setup(props) {
		// 是否可见
		const showIndex = ref<number>(0);

		const urls = computed(() => {
			const urls: any = props.modelValue || props.src;

			if (isArray(urls)) {
				return urls;
			}

			if (isString(urls)) {
				return (urls || "").split(",").filter(Boolean);
			}

			return [];
		});

		const style = computed(() => {
			const [h, w]: any = isNumber(props.size) ? [props.size, props.size] : props.size;

			return {
				h: parsePx(h),
				w: parsePx(w)
			};
		});

		const showUrls = computed(() => {
			return props.showAll ? urls.value : urls.value.slice(0, 1);
		});

		function changeIndex(val: number) {
			showIndex.value = val;
		}

		return {
			changeIndex,
			showIndex,
			showUrls,
			urls,
			style
		};
	}
});
</script>

<style lang="scss" scoped>
.cl-image {
	display: flex;
	align-items: center;

	.el-image {
		display: block;

		.image-slot {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			background-color: #f7f7f7;
			border-radius: 3px;
		}
	}
}

.show-all {
	&.cl-image {
		display: block;
		overflow-x: hidden;
		overflow-y: auto;
		.el-image {
			display: inline-block;
		}
	}
}
</style>
