<template>
  <nav
    class="flex flex-col w-full px-[45px] bg-white h-auto justify-between items-center"
  >
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center">
        <span class="text-md text-black-600"
          >Wednesday, February 1st, 2023 9:41 PM</span
        >
      </div>
      <div class="flex gap-x-6 items-center px-4">
        <DvxButton
          secondary
          text="Sylman Bros"
          class="h-[40px] items-center flex px-4"
          icon="city"
        />
        <DvxButton
          secondary
          text="Sylman Bros"
          class="h-[40px] items-center flex px-4"
          icon="globe"
        />
        <div
          class="flex justify-center items-center bg-primary h-[70px] text-white gap-x-4 px-4"
        >
          <DvxIcon icon="location" class="text-[20px]" />
          <span class="font-medium"> Slyman Bros (O’Fallon, MO) </span>
        </div>
      </div>
    </div>
    <div class="flex w-full items-center justify-between h-auto">
      <div class="flex items-center gap-x-6 w-1/2 justify-center">
        <DvxIcon icon="Slyman Bros" class="text-[119px]" />
        <DvxButton
          text="Start a Quote"
          class="h-[40px] items-center flex px-4"
        />
        <div class="flex gap-x-3 w-full items-center">
          <TextField
            placeholder="Search everything"
            class="w-full mt-6"
            prepend
            prepend-icon="search"
          />
          <DvxIcon icon="lonceng" class="text-[24px]" />
        </div>
      </div>
      <div class="flex gap-x-6 items-center px-4">
        <div
          class="flex rounded-full w-10 bg-red-200 h-10 items-center justify-center font-bold text-white"
        >
          T
        </div>
        <div class="flex flex-col">
          <span class="text-blue-300">User</span>
          <span>Role</span>
        </div>
      </div>
    </div>
  </nav>
</template>
