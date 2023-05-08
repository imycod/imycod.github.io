import{_ as s,c as n,o as a,a as l}from"./app.20d0f183.js";const p="/image-20230509000855985.png",e="/image-20230509000950644.png",o="/image-20230509001006549.png",h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"2个el-tree和1个下拉框状态映射","slug":"_2个el-tree和1个下拉框状态映射","link":"#_2个el-tree和1个下拉框状态映射","children":[]}],"relativePath":"project/pigx/index.md"}'),t={name:"project/pigx/index.md"},c=l(`<h2 id="_2个el-tree和1个下拉框状态映射" tabindex="-1">2个el-tree和1个下拉框状态映射 <a class="header-anchor" href="#_2个el-tree和1个下拉框状态映射" aria-hidden="true">#</a></h2><blockquote><p>一个需求是tree的每个节点都对应另一个新tree,那么我们要用对象作为存储的数据接口,以叶子节点作为key以另一棵树的选中状态作为value,数据结构如下</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// fake mock</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> checkedMap</span><span style="color:#89DDFF;">={</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">000024</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">3</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">4</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><blockquote><p>但是另外一个需求是,我们还需要记录每个节点当前下拉框的状态,这时数据结构需要做些改变</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// fake mock</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> checkedMap</span><span style="color:#89DDFF;">={</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">000024</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">0</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">checked</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">3</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">4</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><img src="`+p+'" alt="image-20230509000855985"></p><p><img src="'+e+'" alt="image-20230509000950644"></p><p><img src="'+o+`" alt="image-20230509001006549"></p><p>如图，每个节点都对应２种不同的状态且这两种状态来自不同的外部组件．</p><p>大致代码如下：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">el-tree</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">menuTree</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">data</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">treeDataComputed</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">default-checked-keys</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">currentCheckedKeys</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">check-strictly</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">props</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">defaultProps</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">node-click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">handleMenuNodeClick</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">filter-node-method</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">filterNode</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">filter-tree</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">node-key</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">highlight-current</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">show-checkbox</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#C792EA;">default-expand-all</span><span style="color:#A6ACCD;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">&lt;el-select v-model=&quot;dsType&quot; @change=&quot;onChange&quot; class=&quot;m-2&quot; placeholder=&quot;Select&quot; size=&quot;large&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;el-option v-for=&quot;item in dsOptions.dicData&quot; :key=&quot;item.value&quot; :label=&quot;item.label&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">               :value=&quot;item.value&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/el-select&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">&lt;div v-if=&quot;dsType == 1&quot; v-loading=&quot;isMenuRoleLoading&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;el-tree ref=&quot;scopeTree&quot; :data=&quot;dsScopeData&quot; :check-strictly=&quot;true&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">             :default-checked-keys=&quot;checked&quot; @check=&quot;check&quot; :props=&quot;defaultProps&quot; class=&quot;filter-tree&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">             node-key=&quot;id&quot; highlight-current show-checkbox /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">        data(){</span></span>
<span class="line"><span style="color:#A6ACCD;">          return {</span></span>
<span class="line"><span style="color:#A6ACCD;">            dsType: 0,</span></span>
<span class="line"><span style="color:#A6ACCD;">            currentItem: {},</span></span>
<span class="line"><span style="color:#A6ACCD;">            checkedDsScope:{},</span></span>
<span class="line"><span style="color:#A6ACCD;">          }  </span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">         computed: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            checked(){</span></span>
<span class="line"><span style="color:#A6ACCD;">                return this.checkedDsScope[this.currentItem.id+&#39;&#39;]?.checked</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            treeDataComputed() {</span></span>
<span class="line"><span style="color:#A6ACCD;">                const copyTreeData = deepClone(this.treeData)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">                this.setTreeDisabled(copyTreeData)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">                return filterTreeByCheckKeys(copyTreeData, this.currentCheckedKeys)</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">    	},</span></span>
<span class="line"><span style="color:#A6ACCD;">        methods: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            onChange(v){</span></span>
<span class="line"><span style="color:#A6ACCD;">                this.checkedDsScope[this.currentItem.id+&#39;&#39;][&#39;checked&#39;]=this.checkedDsScope[this.currentItem.id+&#39;&#39;].checked</span></span>
<span class="line"><span style="color:#A6ACCD;">                this.checkedDsScope[this.currentItem.id+&#39;&#39;][&#39;type&#39;]=v</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            check(_,b){</span></span>
<span class="line"><span style="color:#A6ACCD;">                this.checkedDsScope[this.currentItem.id+&#39;&#39;][&#39;checked&#39;]=b.checkedKeys</span></span>
<span class="line"><span style="color:#A6ACCD;">                this.checkedDsScope[this.currentItem.id+&#39;&#39;][&#39;type&#39;]=this.dsType</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">             async handleMenuNodeClick(data) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                this.currentItem = data</span></span>
<span class="line"><span style="color:#A6ACCD;">                if (this.dsType==1) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    this.$refs.scopeTree.setCheckedKeys([])</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">                if (!this.checkedDsScope[this.currentItem.id+&#39;&#39;]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    this.checkedDsScope[this.currentItem.id+&#39;&#39;]={</span></span>
<span class="line"><span style="color:#A6ACCD;">                        checked: [],</span></span>
<span class="line"><span style="color:#A6ACCD;">                        type:this.dsType,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    }</span></span>
<span class="line"><span style="color:#A6ACCD;">                }else{</span></span>
<span class="line"><span style="color:#A6ACCD;">                    this.dsType = this.checkedDsScope[this.currentItem.id+&#39;&#39;].type</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">        }	</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"></span></code></pre></div><p>借助handleMenuNodeClick事件我们初始化tree选中空状态,因为在每次选中时我们会调用check把相关节点的id和选中的状态以及下拉的状态都做了关联,只需要在模板里绑定:default-checked-keys=&quot;checked&quot;对应的状态即可</p>`,12),r=[c];function D(y,i,C,A,F,d){return a(),n("div",null,r)}const k=s(t,[["render",D]]);export{h as __pageData,k as default};
