import React from "react";

export default function Invoice() {
  return (
    <div className="flex p-6">
      <div class="border-black-400 border-2 max-w-xl mx-auto py-16 bg-white flex">
        <article class="overflow-hidden">
          <div class="bg-[white] rounded-b-md">
            <div class="p-9">
              <div class="space-y-6 text-slate-700">
                <img
                  class="object-cover h-12"
                  src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=0d48043a-f970-4495-b131-5f788bb00733"
                />

                <p class="text-xl font-extrabold tracking-tight uppercase font-body">
                  M J PUBLIC SCHOOL
                </p>
              </div>
            </div>
            <div class="p-9">
              <div class="flex w-full">
                <div class="grid grid-cols-4 gap-12">
                  <div class="text-sm font-light text-slate-500">
                    <p class="text-sm font-normal text-slate-700">
                      Invoice Detail:
                    </p>
                    <p>Madnai Link Road</p>
                    <p>Sadabad</p>
                    <p>Hathras</p>
                    <p>UP 281306</p>
                  </div>
                  <div class="text-sm font-light text-slate-500">
                    <p class="text-sm font-normal text-slate-700">Billed To</p>
                    <p>student name</p>
                    <p>place</p>
                    <p>UP pincode</p>
                  </div>
                  <div class="text-sm font-light text-slate-500">
                    <p class="text-sm font-normal text-slate-700">
                      Invoice Number
                    </p>
                    <p>mjps/date/timehour</p>

                    <p class="mt-2 text-sm font-normal text-slate-700">
                      Date of Issue
                    </p>
                    <p>date</p>
                  </div>
                  <div class="text-sm font-light text-slate-500">
                    <p class="text-sm font-normal text-slate-700">Class</p>
                    <p>class - section</p>

                    <p class="mt-2 text-sm font-normal text-slate-700">
                      Total Due
                    </p>
                    <p>dues-march</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-9">
              <div class="flex flex-col mx-0 mt-8">
                <table class="min-w-full divide-y divide-slate-500">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                      >
                        Description
                      </th>

                      <th
                        scope="col"
                        class="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-slate-200">
                      <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                        <div class="font-medium text-slate-700">
                          Tesla Truck
                        </div>
                        <div class="mt-0.5 text-slate-500 sm:hidden">
                          1 unit at $0.00
                        </div>
                      </td>

                      <td class="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        $0.00
                      </td>
                    </tr>

                    {/* <!-- Here you can write more products/tasks that you want to charge for--> */}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        colspan="3"
                        class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Subtotal
                      </th>
                      <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        $0.00
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colspan="3"
                        class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Concession
                      </th>
                      <th
                        scope="row"
                        class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Concession
                      </th>
                      <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        $0.00
                      </td>
                    </tr>

                    <tr>
                      <th
                        scope="row"
                        colspan="3"
                        class="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        class="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                      >
                        Total
                      </th>
                      <td class="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                        $0.00
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div class=" p-9">
              <div class="border-t pt-9 border-slate-200">
                <div class="text-sm font-light text-slate-700">
                  <p>
                    Payment terms are 14 days. Please be aware that according to
                    the Late Payment of Unwrapped Debts Act 0000, freelancers
                    are entitled to claim a 00.00 late fee upon non-payment of
                    debts after this time, at which point a new invoice will be
                    submitted with the addition of this fee. If payment of the
                    revised invoice is not received within a further 14 days,
                    additional interest will be charged to the overdue account
                    and a statutory rate of 8% plus Bank of England base of
                    0.5%, totalling 8.5%. Parties cannot contract out of the
                    Act’s provisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div>|</div>
      <div class="border-black-400 border-2 max-w-xl mx-auto py-16 bg-white flex">
        <article class="overflow-hidden">
          <div class="bg-[white] rounded-b-md">
            <div class="p-9">
              <div class="space-y-6 text-slate-700">
                <img
                  class="object-cover h-12"
                  src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=0d48043a-f970-4495-b131-5f788bb00733"
                />

                <p class="text-xl font-extrabold tracking-tight uppercase font-body">
                  M J PUBLIC SCHOOL
                </p>
              </div>
            </div>
            <div class="p-9">
              <div class="flex w-full">
                <div class="grid grid-cols-4 gap-12">
                  <div class="text-sm font-light text-slate-500">
                    <p class="text-sm font-normal text-slate-700">
                      Invoice Detail:
                    </p>
                    <p>Madnai Link Road</p>
                    <p>Sadabad</p>
                    <p>Hathras</p>
                    <p>UP 281306</p>
                  </div>
                  <div class="text-sm font-light text-slate-500">
                    <p class="text-sm font-normal text-slate-700">Billed To</p>
                    <p>student name</p>
                    <p>place</p>
                    <p>UP pincode</p>
                  </div>
                  <div class="text-sm font-light text-slate-500">
                    <p class="text-sm font-normal text-slate-700">
                      Invoice Number
                    </p>
                    <p>mjps/date/timehour</p>

                    <p class="mt-2 text-sm font-normal text-slate-700">
                      Date of Issue
                    </p>
                    <p>date</p>
                  </div>
                  <div class="text-sm font-light text-slate-500">
                    <p class="text-sm font-normal text-slate-700">Class</p>
                    <p>class - section</p>

                    <p class="mt-2 text-sm font-normal text-slate-700">
                      Total Due
                    </p>
                    <p>dues-march</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-9">
              <div class="flex flex-col mx-0 mt-8">
                <table class="min-w-full divide-y divide-slate-500">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                      >
                        Description
                      </th>

                      <th
                        scope="col"
                        class="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-slate-200">
                      <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                        <div class="font-medium text-slate-700">
                          Tesla Truck
                        </div>
                        <div class="mt-0.5 text-slate-500 sm:hidden">
                          1 unit at $0.00
                        </div>
                      </td>

                      <td class="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        $0.00
                      </td>
                    </tr>

                    {/* <!-- Here you can write more products/tasks that you want to charge for--> */}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        colspan="3"
                        class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Subtotal
                      </th>
                      <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        $0.00
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colspan="3"
                        class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Concession
                      </th>
                      <th
                        scope="row"
                        class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Concession
                      </th>
                      <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        $0.00
                      </td>
                    </tr>

                    <tr>
                      <th
                        scope="row"
                        colspan="3"
                        class="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        class="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                      >
                        Total
                      </th>
                      <td class="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                        $0.00
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div class=" p-9">
              <div class="border-t pt-9 border-slate-200">
                <div class="text-sm font-light text-slate-700">
                  <p>
                    Payment terms are 14 days. Please be aware that according to
                    the Late Payment of Unwrapped Debts Act 0000, freelancers
                    are entitled to claim a 00.00 late fee upon non-payment of
                    debts after this time, at which point a new invoice will be
                    submitted with the addition of this fee. If payment of the
                    revised invoice is not received within a further 14 days,
                    additional interest will be charged to the overdue account
                    and a statutory rate of 8% plus Bank of England base of
                    0.5%, totalling 8.5%. Parties cannot contract out of the
                    Act’s provisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
