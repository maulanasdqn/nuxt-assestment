<template>
  <div
    v-if="!!dataAlert"
    class="text-[14px] py-[6px] px-[8px] rounded-lg font-medium"
    :class="
      dataAlert && dataAlert.type === 'error'
        ? 'bg-red-100 text-red-900'
        : 'bg-green-50 text-green-600'
    "
  >
    <div v-if="dataAlert && dataAlert.title" class="title">
      <strong>
        {{ (dataAlert && dataAlert.title) || '' }}
      </strong>
    </div>
    <div class="">
      <div
        v-if="
          dataAlert &&
          Array.isArray(dataAlert.message) &&
          dataAlert.message.length > 1
        "
      >
        <div v-for="(item, i) in dataAlert.message" :key="`toast-item-${i}`">
          {{ item.detail }}
        </div>
      </div>
      <span v-else>
        {{
          (dataAlert && dataAlert.message) ||
          `Tidak dapat memproses, silakan untuk coba lagi nanti.
            Hubungi admin atau customer service untuk detail lebih lanjut.`
        }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    dataAlert: {
      type: Object,
      default: null,
    },
  },
}
</script>
