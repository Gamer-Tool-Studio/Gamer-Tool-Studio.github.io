<script setup>
useHead({
  title: 'History ',
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Billing history</h1>
      </v-col>
      <v-col cols="12">
        <p>Showing invoices within the past 12 months.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <table class="billing-table">
          <thead class="theader">
            <tr>
              <th>Invoice</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AE46GA&5AS=-001</td>
              <td>Paid</td>
              <td>$0,00</td>
              <td> 2 August 2023, 08:17</td>
              <td><a href="">View</a></td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.billing-table {
  padding: 5px;
  width: 80%;
  text-align: left;

}
.billing-table thead{
  display: table-header-group;
  vertical-align: middle;
}

.billing-table th {
  padding: 5px;
}

.billing-table td {
  font-size: 14px;
  padding: 5px;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .billing-table {
    text-align: center;
    align-items: center;
    align-content: center;
  }
}
</style>
