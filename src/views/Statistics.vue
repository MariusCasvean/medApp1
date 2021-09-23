<template>
  <div>
    <v-row class="mb-50">
      <v-col cols="12">
        <v-chip class="d-flex mb-3 gradient-chip" label text-color="white">
          <v-icon left color="white">mdi-shield-alert-outline</v-icon>
          COVID General Statistics
        </v-chip>
        <div class="top-cards-container">
          <simpleCard
            icon="mdi-account-group"
            bgColor="#7E57C2"
            text="Total patients"
            :data="patients && patients.length"
          />
          <simpleCard
            icon="mdi-ambulance"
            bgColor="#E53935"
            text="Total COVID infected"
            :data="totalCovidCases"
          />
          <simpleCard
            icon="mdi-hospital-box"
            bgColor="#43A047"
            text="Healed Patients"
            :data="totalHealed"
          />
          <simpleCard
            icon="mdi-emoticon-sick-outline"
            bgColor="#EF6C00"
            text="COVID infected Now"
            :data="totalCovidCasesNow"
          />
          <simpleCard
            icon="mdi-needle"
            bgColor="#42a5f5"
            text="Administered vaccines"
            :data="totalVaccines"
          />
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-50">
      <v-col cols="6">
        <v-chip color="#5E35B1" class="d-flex mb-3 gradient-chip" label text-color="white">
          <v-icon left>mdi-earth</v-icon>
          COVID cases - REGIONS
        </v-chip>
        <div class="regions-container">
          <div class="regions-container-map">
            <span
              v-for="(reg, index) in regionList"
              :key="index"
              class="dot"
              :class="reg.toLowerCase()"
              >{{ regionsData[index] }}</span
            >
            <img src="../assets/regions_map.png" alt="regions_map" />
          </div>
          <div class="regions-container-legend">
            <div
              v-for="(region, index) in regionList"
              :key="index"
              class="d-flex"
            >
              <div
                class="region-square"
                :style="{ backgroundColor: regionColorList[index] }"
              ></div>
              <p class="region-name">{{ region }}</p>
            </div>
          </div>
        </div>
        <!-- <v-sparkline
          :labels="[' ', ' ', ...regionList, ' ', ' ']"
          label-size="2.5"
          :value="regionsStatisticData"
          :smooth="1"
          :padding="0"
          line-width="1"
          :stroke-linecap="lineCap"
          :fill="false"
          :type="type"
          :auto-line-width="autoLineWidth"
          auto-draw
          :width="200"
          :height="60"
          color="#E53935"
        ></v-sparkline> -->
      </v-col>
      <v-col cols="3">
        <v-chip color="#5E35B1" class="d-flex mb-3 gradient-chip" label text-color="white">
          <v-icon left>mdi-chart-arc</v-icon>
          Patients associated diseases
        </v-chip>
        <div class="chart-container">
          <doughnutChart
            class="chart"
            :labelsProp="diseaseList"
            :dataProp="diseasesData"
            :colorsProp="diseasesColorList"
            :showLegendProp="false"
          />
        </div>
      </v-col>
      <v-col cols="3">
        <v-chip color="#5E35B1" class="d-flex mb-3 gradient-chip" label text-color="white">
          <v-icon left>mdi-gender-male-female</v-icon>
          Patients gender
        </v-chip>
        <div class="chart-container">
          <doughnutChart
            class="chart"
            :labelsProp="gendersList"
            :dataProp="gendersData"
            :colorsProp="gendersColorList"
            :showLegendProp="true"
          />
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-50">
      <v-col cols="12">
        <v-chip color="#5E35B1" class="d-flex mb-3 gradient-chip" label text-color="white">
          <v-icon left>mdi-poll</v-icon>
          COVID cases - COUNTIES
        </v-chip>
        <div class="counties-statistics-container">
          <span class="twentyfive limit">25</span>
          <span class="twenty limit">20</span>
          <span class="fifteen limit">15</span>
          <span class="ten limit">10</span>
          <span class="five limit">5</span>
          <span class="zero limit">0</span>
          <div class="top">
            <div
              class="bar-container"
              v-for="(county, index) in countyList"
              :key="county"
            >
              <div
                class="bar"
                :style="{ height: `${countiesStatisticData[index] * 4}%` }"
              ></div>
            </div>
          </div>
          <div class="bottom">
            <div
              class="county-label"
              v-for="(county, index) in countyList"
              :key="county"
            >
              {{ countyListShort[index] }}
              <span>{{ countiesStatisticData[index] }}</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  counties,
  countiesShort,
  diseases,
  diseasesColor,
  genders,
  gendersColor,
  regions,
  regionsColor,
} from "../utils/constants";

export default {
  data: () => ({
    autoLineWidth: true,
    countyList: counties,
    countyListShort: countiesShort,
    diseaseList: diseases,
    diseasesColorList: diseasesColor,
    gendersList: genders,
    gendersColorList: gendersColor,
    lineCap: "round",
    regionList: regions,
    regionColorList: regionsColor,
    type: "trend",
  }),
  computed: {
    patients() {
      return this.$store.getters.patients;
    },
    totalCovidCases() {
      let totalNumber = 0;
      this.patients.forEach((element) => {
        if (element.covidBefore || element.covidNow) {
          totalNumber++;
        }
      });
      return totalNumber;
    },
    totalCovidCasesNow() {
      let totalNumber = 0;
      this.patients.forEach((element) => {
        if (element.covidNow) {
          totalNumber++;
        }
      });
      return totalNumber;
    },
    totalHealed() {
      let healed = 0;
      this.patients.forEach((element) => {
        if (element.covidBefore) {
          healed++;
        }
      });
      return healed;
    },
    totalVaccines() {
      let vaccines = 0;
      this.patients.forEach((element) => {
        if (element.covidVaccine) {
          vaccines++;
        }
      });
      return vaccines;
    },
    // regionsStatisticData() {
    //   let data = new Array(this.regionList.length).fill(0);
    //   this.patients.forEach((patient) => {
    //     this.regionList.forEach((regionItem, index) => {
    //       if (
    //         patient &&
    //         patient.region === regionItem &&
    //         (patient.covidBefore || patient.covidNow)
    //       ) {
    //         data[index]++;
    //       }
    //     });
    //   });
    //   return [0, 0, ...data, 0, 0];
    // },
    // regionsStatisticsLabels() {
    //   let result = [];
    //   this.regionList.forEach((item, index) => {
    //     result.push(`${item} ${this.regionsStatisticData[index+2]}`);
    //   });
    //   return result;
    // },
    regionsData() {
      let data = new Array(this.regionList.length).fill(0);
      this.patients.forEach((patient) => {
        this.regionList.forEach((regionItem, index) => {
          if (
            patient &&
            patient.region === regionItem &&
            (patient.covidBefore || patient.covidNow)
          ) {
            data[index]++;
          }
        });
      });

      return data;
    },
    diseasesData() {
      let data = new Array(this.diseaseList.length).fill(0);
      this.patients.forEach((patient) => {
        patient.diseases.forEach((patientDisease) => {
          this.diseaseList.forEach((disease, indexDisease) => {
            if (patientDisease === disease) {
              data[indexDisease]++;
            }
          });
        });
      });

      return data;
    },
    gendersData() {
      let data = new Array(this.gendersList.length).fill(0);
      this.patients.forEach((patient) => {
        this.gendersList.forEach((genderItem, genderIndex) => {
          if (patient && patient.gender === genderItem) {
            data[genderIndex]++;
          }
        });
      });

      return data;
    },
    countiesStatisticData() {
      let data = new Array(this.countyList.length).fill(0);
      this.patients.forEach((patient) => {
        this.countyList.forEach((countyItem, index) => {
          if (
            patient &&
            patient.county === countyItem &&
            (patient.covidBefore || patient.covidNow)
          ) {
            data[index]++;
          }
        });
      });
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.mb-50 {
  margin-bottom: 20px;
  .top-cards-container {
    display: flex;
    justify-content: space-between;
  }
}
.gradient-chip {
  background-image: linear-gradient(to right, #4527A0, #7E57C2) !important;
}
.regions-container {
  display: flex;
  background-color: #E8F5E9;
  padding: 5px;
  &-map {
    position: relative;
    .dot {
      position: absolute;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #e65100;
      border: 1px solid black;
      color: white;
      text-shadow: 2px 2px 1px black;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 2px 2px 4px black;
      transition: transform 0.3s;
      &:hover {
        cursor: pointer;
        transform: scale(1.6);
        box-shadow: 4px 4px 8px black;
        text-shadow: none;
      }
    }
    .banat {
      left: 12%;
      top: 52%;
    }
    .bucovina {
      left: 58%;
      top: 5%;
    }
    .crisana {
      left: 15%;
      top: 26%;
    }
    .dobrogea {
      left: 84%;
      top: 64%;
    }
    .maramures {
      left: 30%;
      top: 6%;
    }
    .moldova {
      left: 66%;
      top: 30%;
    }
    .muntenia {
      left: 58%;
      top: 68%;
    }
    .oltenia {
      left: 30%;
      top: 70%;
    }
    .transilvania {
      left: 40%;
      top: 34%;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      box-shadow: 1px 1px 2px grey;
    }
  }
  &-legend {
    width: 100%;
    padding: 0 0 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .region-square {
      height: 20px;
      width: 20px;
      border: 1px solid rgb(117, 116, 116);
      border-radius: 2px;
      margin-right: 10px;
      display: inline-block;
    }
    .region-name {
      display: inline;
      margin: 0;
    }
  }
}
.chart-container {
  min-height: 260px;
  background-color: #E8F5E9;
  padding: 5px;
  .chart {
    margin: 0 auto;
    width: 72%;
  }
}
.counties-statistics-container {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  position: relative;
  .limit {
    position: absolute;
    left: 2px;
    font-size: 12px;
  }
  .twentyfive {
    top: -6px;
  }
  .twenty {
    top: 18px;
  }
  .fifteen {
    top: 44px;
  }
  .ten {
    top: 70px;
  }
  .five {
    top: 96px;
  }
  .zero {
    top: 122px;
  }
  .top {
    flex: 3;
    display: flex;
    margin-bottom: 1px;
    .bar-container {
      // background-color: white;
      display: flex;
      justify-content: space-between;
      flex: 1;
      margin: 0 2px;
      position: relative;
      // box-shadow: 1px 1px 1px grey;
      border-radius: 2px;
      &:first-child {
        margin: 0 2px 0 0;
      }
      &:last-child {
        margin: 0 0 0 2px;
      }
      &:hover {
        cursor: pointer;
        box-shadow: 1px 1px 3px grey;
      }
      .bar {
        box-shadow: 1px 1px 2px grey;
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: #64b5f6;
      }
    }
  }
  .bottom {
    flex: 1;
    display: flex;
    .county-label {
      font-size: 14px;
      flex: 1;
      display: flex;
      justify-content: center;
      position: relative;
      span {
        position: absolute;
        top: 18px;
        font-size: 10px;
        background-color: grey;
        color: #fff;
        padding: 0 10px;
        border-radius: 4px;
      }
    }
  }
}
</style>