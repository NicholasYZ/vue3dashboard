<script setup lang="ts">

function blobToBase64(blob: any) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}


const onFileChange = (e: any) => {
  const photo = e.target.files[0];
  const form = new FormData();
  form.append("image_file", photo);
  // form.append("prompt", "an girl on a landscape, cinematic");

  fetch("https://clipdrop-api.co/remove-background/v1", {
    method: "POST",
    headers: {
      "x-api-key": "e343491a03e8b6347decf4e9f3e94bf7c465abc3428a4551ee3a20fb833da54c66c581fb4b22d489e6662e97bc7fcc8f",
    },
    body: form,
  })
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      console.log(buffer);

      const blob = new Blob([buffer], { type: "image/png" });

      blobToBase64(blob).then((base64) => {
        console.log(base64);
      });

      // const url = window.URL.createObjectURL(blob);
      // console.log(url);
      // buffer here is a binary representation of the returned image
    });
};
</script>
<template>
  <vd-card>
    <article class="prose prose-slate">
      <h1>Garlic bread with cheese: What the science tells us</h1>
      <p>
        For years parents have espoused the health benefits of eating garlic
        bread with cheese to their children, with the food earning such an
        iconic status in our culture that kids will often dress up as warm,
        cheesy loaf for Halloween.
      </p>
      <p>
        But a recent study shows that the celebrated appetizer may be linked to
        a series of rabies cases springing up around the country.
      </p>
    </article>

    <!-- <input
      type="file"
      name="photo"
      id="photo"
      accept="image/*"
      multiple
      @change="onFileChange"
    /> -->
  </vd-card>
</template>
