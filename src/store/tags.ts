import { ref } from "vue";
import { defineStore } from "pinia";

type tagsProps = {
  name: string;
  path: string;
};

export const useTags = defineStore("tags", () => {
  const tags = ref<tagsProps[]>([]);
  const setTags = (tag: tagsProps) => {
    let hasTag: boolean = false;
    tags.value.forEach(({ name }: { name: string }) => {
      if (name === tag.name) {
        hasTag = true;
      }
    });
    if (!hasTag) {
      tags.value.push(tag);
    }
  };
  return { tags, setTags };
});
