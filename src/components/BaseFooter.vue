<template>
  <footer class="py-2" style="border-top: 0.8px solid rgba(0,0,0,0.1)">
    <div class="container">
      <div class="row align-items-center justify-content-xl-between">
        <div class="col-xl-6">
          <div class="copyright text-center text-xl-left text-muted">
            &copy; 2018 - {{year}}
            <a
              href="http://mindzzle.com/id/"
              class="font-weight-bold ml-1"
              target="_blank"
            >Mindzzle</a>
          </div>
        </div>
        <div class="col-xl-6">
          <ul class="nav nav-footer justify-content-center justify-content-xl-end">
            <li class="nav-item">
              <a href="http://mindzzle.com/id/" class="nav-link" target="_blank">Mindzzle</a>
            </li>
            <li class="nav-item">
              <a href="http://mindzzle.com/id/about.html" class="nav-link" target="_blank">
                About
                Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "base-footer",
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<style>
</style>