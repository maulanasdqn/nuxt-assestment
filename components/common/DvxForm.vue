<template>
  <ValidationObserver
    ref="observer"
    v-slot="{ valid, changed, dirty }"
    tag="form"
    :disabled="disabled"
    :action="action"
    :method="method"
    @submit="submit"
  >
    <slot name="default" v-bind="{ valid, changed, dirty }" />
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    isPrevent: {
      type: Boolean,
      default: true,
    },
    method: {
      type: String,
      default: '',
    },
    action: {
      type: String,
      default: '',
    },
  },
}
</script>
