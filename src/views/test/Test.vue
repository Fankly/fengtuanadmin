<template>
  <div>
    <el-button type="success" icon="el-icon-plus" @click="addtable">
      添加
    </el-button>
    <el-button type="warning" icon="el-icon-share" @click="qingchutable">
      清空
    </el-button>
    <el-button type="danger" icon="el-icon-delete" @click="deltable">
      删除
    </el-button>

    <el-table
      :data="ruleForm.annualBudgetBookDTOList"
      class="table1"
      @selection-change="handleDetailSelectionChange"
      :row-class-name="rowClassName"
      ref="tb"
    >
      <el-table-column type="selection" width="30" align="center" />
      <el-table-column type="index" label="序号" width="50"></el-table-column>

      <el-table-column label="教材名称" width="300">
        <template slot-scope="scope">
          <el-input v-model="scope.row.bookName"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="开本" width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.kaiben" class="kaiben">
            <el-option
              v-for="item in selectData.kaiben"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="计量单位" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.measure"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="数量" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.bookQuantity"></el-input>
        </template>
      </el-table-column>

      ......

      <el-table-column label="备注" width="250">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        annualBudgetBookDTOList: [
          {
            bookName: "", //教材名称
            bookPrice: "", //单价
            bookQuantity: "", //教材数量
            concentratedApplication: "", //集中申请数
            concentratedAudit: "", //集中审核数
            measure: "", //计量单位
            remark: "", //备注
            sporadicApplication: "", //零星申请数量
            sporadicAudit: "", //零星审核数量
            totalApplication: "", //合计申请数
            totalAudit: "", //合计审核数
            totalUpdate: "", //合计 审核数量
          },
        ],
      },

      //选中的表数据
      checkedDetail: [],
    };
  },
};
</script>
