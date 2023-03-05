import { useCrud } from "@cool-vue/crud";
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
	name: "cl-input",

	props: {
		modelValue: [String, Number],
		prop: String,
		placeholder: String
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		// cl-crud
		const Crud = useCrud();

		const value = ref();

		const tip = computed(() => {
			return Crud.value?.["cl-table"]?.columns?.find((item) => item.prop === props.prop)
				?.label;
		});

		// 值改变
		function onChange(val: string) {
			emit("update:modelValue", val);
			emit("change", val);

			if (props.prop) {
				Crud.value?.refresh({ page: 1, [props.prop]: val === "" ? undefined : val });
			}
		}

		watch(
			() => props.modelValue,
			(val) => {
				value.value = val;
			},
			{
				immediate: true
			}
		);

		return () => {
			return (
				<el-input
					v-model={value.value}
					style={{ width: "200px" }}
					clearable
					placeholder={props.placeholder || tip.value}
					onChange={onChange}
				/>
			);
		};
	}
});
