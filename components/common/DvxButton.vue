<template>
  <button
    @click="onClick()"
    :type="type"
    :class="{
      'bg-white border-primary border-2 text-primary hover:bg-blue-100 focus:bg-blue-300  disabled:opacity-25':
        secondary,
      'bg-primary text-white hover:bg-primary-700 focus:bg-primary-900':
        !secondary,
    }"
    class="rounded-lg disabled:opacity-25 disabled:hover:none"
  >
    <div
      v-if="!textOnly && !iconOnly"
      :class="{
        'w-[120px] h-[44px] gap-x-[12px] text-[14px]': !small && !medium,
        'w-[102px] h-[37px] gap-x-[10px] text-[12px]': medium && !small,
        'w-[74px] h-[22px] gap-x-[8px] text-[10px]': small && !medium,
      }"
      class="flex items-center justify-center"
    >
      <DvxIcon
        :icon="icon"
        :class="{
          'text-[20px]': !medium && !small,
          'text-[16px]': medium && !small,
          'text-[13px]': !medium && small,
        }"
      />
      <span class="font-medium font-sans">{{ text }}</span>
    </div>
    <div
      v-else-if="textOnly && !iconOnly"
      class="flex w-[86px] h-[44px] items-center justify-center gap-x-[12px]"
    >
      <span class="font-medium font-sans">{{ text }}</span>
    </div>
    <div
      v-if="!textOnly && iconOnly"
      class="flex w-[44px] h-[44px] items-center justify-center gap-x-[12px]"
    >
      <DvxIcon :icon="icon" class="text-[20px]" />
    </div>
  </button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },

    secondary: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: 'button',
    },

    icon: {
      type: String,
      default: '',
    },

    textOnly: {
      type: Boolean,
      default: false,
    },

    iconOnly: {
      type: Boolean,
      default: false,
    },

    medium: {
      type: Boolean,
      default: false,
    },

    small: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
    onBlur() {
      this.$emit('blur')
    },
  },
}
</script>
