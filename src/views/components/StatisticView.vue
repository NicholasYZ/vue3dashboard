<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-6 text-sm mb-6"
  >
    <vd-statistic
      title="Total Orders"
      color="#ec6769"
      icon="ShoppingCartFull"
      num="611"
      class="hover:shadow-lg transition-shadow duration-500"
    />
    <vd-statistic
      title="Total Expenses"
      color="#fedb6a"
      icon="WalletFilled"
      num="355"
      class="hover:shadow-lg transition-shadow duration-500"
    />
    <vd-statistic
      title="Total Profit"
      color="#95cb72"
      icon="Money"
      num="5655"
      class="hover:shadow-lg transition-shadow duration-500"
    />
    <vd-statistic
      title="Total Vistors"
      color="#5976cb"
      icon="UserFilled"
      num="848"
      class="hover:shadow-lg transition-shadow duration-500"
    />
  </div>
</template>
