<template>
  <components
    :is="instance"
    class="inline-flex overflow-visible"
    width="1em"
    height="1em"
    preserve-aspect-ratio="xMidYMid meet"
    @click="onClick"
  />
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      instance: null,
    }
  },
  watch: {
    async icon(val) {
      if (val) {
        try {
          this.instance = await import(`~/assets/icons/${val}.svg?inline`)
        } catch (error) {
          this.instance = null
        }
      }
    },
  },
  async beforeCreate() {
    try {
      this.instance = await import(
        `~/assets/icons/${this.$options.propsData.icon}.svg?inline`
      )
    } catch (error) {
      this.instance = null
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>
