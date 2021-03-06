<template>
  <div>
    <v-card
      outlined
    >
      <v-row>
        <v-expansion-panels
          v-model="panelCase"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t('label.patient_profile_data_update') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ValidationObserver ref="observer">
                <v-form
                  ref="form"
                  lazy-validation
                >
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                      sm="12"
                    >
                      <ValidationProvider>
                        <label>{{ $t('label.case_id') }}</label>
                        <v-text-field
                          v-model="formPasien.id_case"
                          disabled
                          solo-inverted
                        />
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot="{ errors }"
                      >
                        <v-label>{{ $t('label.related_case_id') }}</v-label>
                        <v-text-field
                          v-model="formPasien.id_case_national"
                          :error-messages="errors"
                          solo-inverted
                        />
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot="{ errors }"
                      >
                        <v-label>{{ $t('label.center_case_id') }}</v-label>
                        <v-text-field
                          v-model="formPasien.id_case_related"
                          :error-messages="errors"
                          solo-inverted
                        />
                      </ValidationProvider>
                      <ValidationProvider>
                        <v-label>{{ $t('label.profession') }}</v-label>
                        <v-select
                          v-model="formPasien.occupation"
                          :items="occupationList"
                          item-value="title"
                          item-text="title"
                          menu-props="auto"
                          solo
                        />
                      </ValidationProvider>
                      <ValidationProvider>
                        <v-label>{{ $t('label.office_address') }}</v-label>
                        <v-textarea
                          v-model="formPasien.office_address"
                          solo
                        />
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                      >
                        <label class="required">{{ $t('label.citizenship') }}</label>
                        <v-radio-group
                          v-model="formPasien.nationality"
                          :error-messages="errors"
                          row
                          @change="handleChangeNationality"
                        >
                          <v-radio
                            :label="$t('label.wni')"
                            value="WNI"
                          />
                          <v-radio
                            :label="$t('label.wna')"
                            value="WNA"
                          />
                        </v-radio-group>
                      </ValidationProvider>
                      <ValidationProvider
                        v-if="formPasien.nationality === 'WNA'"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="formPasien.nationality_name"
                          :error-messages="errors"
                          :placeholder="$t('label.country_origin')"
                          solo-inverted
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      sm="12"
                    >
                      <ValidationProvider
                        v-slot="{ errors }"
                      >
                        <label>{{ $t('label.nik') }}</label>
                        <v-text-field
                          v-model="formPasien.nik"
                          :error-messages="errors"
                          solo-inverted
                        />
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|isHtml"
                      >
                        <label class="required">{{ $t('label.name_case') }}</label>
                        <v-text-field
                          v-model="formPasien.name"
                          :error-messages="errors"
                          solo-inverted
                        />
                      </ValidationProvider>
                      <label>{{ $t('label.birth_date') }}</label>
                      <select-datetime
                        :datetime="formPasien.birth_date"
                        :date-time.sync="formPasien.birth_date"
                        :formate-date="formatDate"
                      />
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|isHtml"
                      >
                        <label class="required">{{ $t('label.age') }}</label>
                        <v-text-field
                          v-model="formPasien.age"
                          :error-messages="errors"
                          solo-inverted
                          type="number"
                        />
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                      >
                        <label class="required">{{ $t('label.gender') }}</label>
                        <v-radio-group
                          v-model="formPasien.gender"
                          :error-messages="errors"
                          row
                        >
                          <v-radio
                            :label="$t('label.male')"
                            value="L"
                          />
                          <v-radio
                            :label="$t('label.female')"
                            value="P"
                          />
                        </v-radio-group>
                      </ValidationProvider>
                      <label class="required">{{ $t('label.address_home') }}</label>
                      <address-region
                        :district-code="formPasien.address_district_code"
                        :district-name="formPasien.address_district_name"
                        :code-district.sync="formPasien.address_district_code"
                        :name-district.sync="formPasien.address_district_name"
                        :sub-district-code="formPasien.address_subdistrict_code"
                        :sub-district-name="formPasien.address_subdistrict_name"
                        :code-sub-district.sync="formPasien.address_subdistrict_code"
                        :name-sub-district.sync="formPasien.address_subdistrict_name"
                        :village-code="formPasien.address_village_code"
                        :village-name="formPasien.address_village_name"
                        :code-village.sync="formPasien.address_village_code"
                        :name-village.sync="formPasien.address_village_name"
                        :disabled-address="false"
                        :required-address="true"
                      />
                      <ValidationProvider>
                        <v-label>{{ $t('label.address_complete_home') }}</v-label>
                        <v-textarea
                          v-model="formPasien.address_street"
                          solo
                        />
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                      >
                        <label class="required">{{ $t('label.phone_number') }}</label>
                        <v-text-field
                          v-model="formPasien.phone_number"
                          :error-messages="errors"
                          solo-inverted
                          type="number"
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-container fluid>
                    <v-row class="survey-bottom-form">
                      <v-col>
                        <v-btn
                          :loading="loading"
                          color="success"
                          bottom
                          style="float: right;"
                          @click="handleUpdateCase"
                        >
                          {{ $t('label.profile_update') }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </ValidationObserver>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <v-row>
        <v-expansion-panels
          v-model="panelListRiwayat"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t('label.case_history_list') }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <case-history-list
                :list-history-case="listHistoryCase"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { getAge } from '@/utils/constantVariable'
import { formatDatetime } from '@/utils/parseDatetime'
import { mapGetters } from 'vuex'
export default {
  name: 'EditCaseForm',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    idData: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      formatDate: 'YYYY/MM/DD',
      panelCase: [0],
      panelListRiwayat: [0],
      listHistoryCase: null
    }
  },
  computed: {
    ...mapGetters('reports', [
      'formPasien'
    ]),
    ...mapGetters('occupation', [
      'occupationList'
    ])
  },
  watch: {
    'formPasien.birth_date': function(value) {
      if ((value !== '') && (value !== null) && (value !== 'Invalid date')) {
        this.formPasien.age = this.getAge(value)
      }
    }
  },
  async mounted() {
    const response = await this.$store.dispatch('reports/listHistoryCase', this.idData)
    this.listHistoryCase = response.data
  },
  methods: {
    getAge,
    formatDatetime,
    async handleUpdateCase() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      const updateCase = {
        id: this.idData,
        data: this.formPasien
      }
      this.loading = true
      await this.$store.dispatch('reports/updateReportCase', updateCase)
      await this.$store.dispatch('toast/successToast', 'Data Profil Berhasil Di Rubah')
      await this.$store.dispatch('reports/resetRiwayatFormPasien')
      this.loading = false
      await this.$router.push('/laporan/list')
    },
    handleChangeNationality(value) {
      if (value === 'WNI') {
        this.formPasien.nationality_name = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
