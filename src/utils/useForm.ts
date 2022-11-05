import { ref } from "vue";

export function useForm(config: any, reload: any) {
  const isModelVisible = ref<boolean>(false);
  const form = ref<any>(config.form);
  const rules = ref<any>(config.rules);
  const onUpdate = (newForm: any) => {
    form.value = newForm;
    isModelVisible.value = true;
  };
  const onSave = (form: any) => {
    console.log(form);
    isModelVisible.value = false;
    reload();
  };
  const onAdd = () => {
    form.value = {};
    isModelVisible.value = true;
  };
  return { form, rules, isModelVisible, onUpdate, onSave, onAdd };
}
