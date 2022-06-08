<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors, valid }"
    :vid="vid"
    :name="name || label || placeholder"
    :rules="rules"
    class="w-full placeholder-black-400"
    :mode="mode"
    :class="{ 'mb-[3px]': !hideMessage }"
    :immediate="immediate"
    tag="fieldset"
  >
    <div name="default" v-bind="{ valid }">
      <slot name="label">
        <label
          v-if="label"
          :for="idFix"
          :class="`block font-medium ${labelSize} ${labelColor} mb-[10px]`"
        >
          {{ label }}
          <span
            v-if="label && rules.split('|').includes('required')"
            class="text-red-900"
            v-text="'*'"
          />
        </label>
      </slot>
      <div class="flex w-full">
        <slot name="prepend-outer" />
        <div
          class="transition duration-500 focus-within:border-blue-400 ease-in-out transform flex flex-wrap w-full relative rounded-lg overflow-hidden border-3 focus-within:border-input-blue-400 items-center"
          :class="[
            disabled ? 'bg-black-75 text-black-500' : bg,
            { 'border-red-600': !!errors[0] },
            textSize,
          ]"
        >
          <slot name="prepend">
            <div v-if="prepend" class="bg-white px-3 flex h-full">
              <span
                class="font-medium flex items-center leading-normal whitespace-no-wrap text-grey-dark"
              >
                <DvxIcon :icon="prependIcon" class="text-[20px]" />
              </span>
            </div>
          </slot>

          <input
            :id="idFix ? idFix : undefined"
            v-model="tempValue"
            :type="typeFixed"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            :name="name"
            :disabled="disabled"
            :readonly="readonly"
            maximum-scale="1"
            class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 relative focus:outline-none"
            :class="[
              height,
              disabled ? 'bg-gray-50 text-black-950' : bg,
              type === 'password' ? 'pl-[12px] pr-[34px]' : 'px-[12px]',
            ]"
            @change="onChange"
            @keypress="onlyNumber($event)"
            @paste="onPaste"
            @focus="onFocus"
          />
          <DvxIcon
            v-if="type === 'password'"
            :icon="isPasswordShow ? 'ic-no-eye' : 'ic-eye'"
            class="absolute text-[19px] text-black-300 cursor-pointer right-[12px]"
            @click="toggleShowPassword"
          />
          <slot name="append">
            <div v-if="append" class="flex h-full font-medium">
              <span
                :class="`
                  flex
                  items-center
                  leading-normal
                  px-3
                  whitespace-no-wrap
                  ${appendBg}
                `"
              >
                <DvxIcon :icon="appendIcon" />
                <DvxIcon v-if="!!errors[0] || customError" icon="exclamation" />
              </span>
            </div>
          </slot>
        </div>
      </div>
      <span
        v-if="
          (!hideMessage && !autoHideMessage) ||
          (autoHideMessage && errors.length > 0) ||
          customError
        "
        class="mt-[5px] mb-[5px] break-word text-red-900 flex items-center"
        :class="[!errors[0] && !customError && 'h-[3px]', labelSize]"
      >
        <DvxIcon
          v-if="errors[0] || customError"
          icon="exclamation"
          class="text-red-900 ml-[1px] mr-[8px] text-[13px]"
        />
        {{ errors[0] || customError || '&nbsp;' }}
      </span>
      <span
        v-if="customSuccess && errors.length === 0"
        class="-mt-[5px] mb-[5px] break-word text-black-200 flex items-center"
        :class="[!customSuccess && 'h-[3px]', labelSize]"
      >
        <DvxIcon
          v-if="customSuccess"
          icon="exclamation"
          class="text-green-600 ml-[1px] mr-[8px] text-[13px]"
        />
        {{ customSuccess }}
      </span>
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { onlyNumberOnKeypress } from '@/utilities/helpers'

export default {
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    id: {
      type: String,
      default: undefined,
    },
    height: {
      type: String,
      default: 'h-10',
    },
    bg: {
      type: String,
      default: 'bg-gray-150',
    },

    mode: {
      type: [String, Function],
      default: undefined,
    },
    autocomplete: {
      type: String,
      default: 'on',
    },
    prepend: {
      type: Boolean,
      default: false,
    },
    append: {
      type: Boolean,
      default: false,
    },
    appendBg: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    rules: {
      type: String,
      default: '',
    },
    immediate: {
      type: Boolean,
      default: false,
    },
    hideMessage: {
      type: Boolean,
      default: false,
    },
    autoHideMessage: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
    vid: {
      type: String,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    precision: {
      type: [String, Number],
      default: 0,
    },
    labelColor: {
      type: String,
      default: 'text-black-400',
    },
    labelSize: {
      type: String,
      default: 'text-[12px]',
    },
    textSize: {
      type: String,
      default: 'text-[14px]',
    },
    customError: {
      type: String,
      default: '',
    },
    customSuccess: {
      type: String,
      default: '',
    },
    prependIcon: {
      type: String,
      default: '',
    },
  },
  data() {
    let temp = this.value
    if (this.isMoney && !!this.value) {
      temp = this.value - 0
    }
    return {
      tempValue: temp,
      isPasswordShow: false,
    }
  },
  computed: {
    idFix() {
      return this.id || (this.name && this.label)
        ? `${this.name}-${this.label}`
        : ''
    },
    typeFixed() {
      if (this.type === 'password' && !this.isPasswordShow) {
        return 'password'
      }
      return 'text'
    },
  },
  watch: {
    value(val) {
      this.tempValue = val
    },
    tempValue(val, oldVal) {
      if (val !== oldVal) {
        this.$emit('input', val)
      }
    },
  },
  methods: {
    onChange(val) {
      this.$emit('change', val)
    },
    onFocus(val) {
      this.$emit('focus', val)
    },
    onlyNumber(ev) {
      if (this.type === 'number') {
        onlyNumberOnKeypress(ev)
      }
    },
    onPaste(ev) {
      if (this.type === 'number') {
        ev.stopPropagation()
        ev.preventDefault()
        const clipboardData = ev.clipboardData || window?.clipboardData
        const pastedData = clipboardData.getData('Text')
        this.tempValue = pastedData.replace(/\D/g, '')
      }
    },
    toggleShowPassword() {
      this.isPasswordShow = !this.isPasswordShow
    },
    setErrors(arrError) {
      this.$refs.provider.setErrors(arrError)
    },
    setPending(val) {
      this.$refs.provider.setFlags({ pending: val })
    },
  },
}
</script>

<style>
.focus-within\:border-input:focus-within {
  border-style: double;
  border-color: transparent;
}
</style>
