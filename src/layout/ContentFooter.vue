<template>
  <footer class="footer px-4">
    <div class="row d-flex justify-content-end">
      <div class="copyright text-center text-lg-left text-muted pr-4">
        © {{year}}
        <a
          href="https://www.creative-tim.com"
          class="font-weight-bold ml-1"
          target="_blank"
        >Mindzzle</a>
        <!-- <a href="https://www.binarcode.com" class="font-weight-bold ml-1" target="_blank">Binar Code</a> -->
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>