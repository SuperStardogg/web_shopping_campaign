<template>
  <div
    class="bg-light-50 flex flex-col gap-2 p-4 text-left rounded-lg card--shadow"
  >
    <div class="flex gap-2 items-center">
      <div class="flex gap-2 flex-col">
        <div class="text-lg">
          <slot name="title" />
        </div>
        <div>
          <slot name="content" />
        </div>
      </div>
      <div class="ml-auto">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card--shadow {
  box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.15);
  &:hover {
    box-shadow: 5px 4px 16px 3px rgba(0, 0, 0, 0.1);
  }
}
</style>
