<template>
  <section class="bg-auth flex flex-row items-center">
    <article class="xl:w-6/12 md:w-8/12 w-full py-20 flex justify-start xl:justify-end">
      <div class=" flex flex-col md:items-end items-start md:justify-end justify-center md:pr-20 pr-4 pl-4 w-full">
        <router-view/>
      </div>
    </article>
    <article class="pl-20 pb-10 self-end hidden xl:flex flex-col xl:visible">
      <label class="color-light block mb-3 uppercase fw-500">Hello you!</label>
      <h3 class="color-light text-3xl fw-700">
        Share what is<br>
        happening and keep<br>
        up with your friends.
      </h3>
    </article>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '@/styles/views/auth';
</style>