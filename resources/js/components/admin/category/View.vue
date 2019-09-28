<template>
    <div>
        <section class="content mt-2">
            <div class="row justify-content-around">
                <div class="col-8">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Category List</h3>
                            <div class="card-tools">
                                <button class="btn btn-primary">
                                    <router-link to="/add-category" class="text-white">
                                        Add Category
                                    </router-link>
                                </button>
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <table id="example2" class="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>
                                        <select name="" id="" v-model="select" @change="deleteSelected">
                                            <option value="">Select</option>
                                            <option value="">Delete all</option>
                                        </select><br>
                                        <input type="checkbox" @click.prevent="selectAll" v-model="all_select">
                                        <span v-if="all_select==false">Check All</span>
                                        <span v-else>Uncheck All</span>
                                    </th>
                                    <th>SL</th>
                                    <th>Category Name</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(category,index) in getallCategory" :key="category.id">
                                    <td><input type="checkbox" v-model="categoryItem" :value="category.id" ></td>
                                    <td>{{index+1}}</td>
                                    <td>{{category.cat_name}}</td>
                                    <td>{{category.created_at | timeformat}}</td>
                                    <td>
                                        <router-link :to="`/edit-category/${category.id}`" class="badge badge-primary">Edit</router-link>
                                        <a href="" @click.prevent="deleteCategory(category.id)" class="badge badge-danger">Delete</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "View",
        data(){
            return{
                categoryItem:[],
                select:'',
                all_select:false
            }
        },
        mounted(){
            this.$store.dispatch("allCategory")
        },
        computed:{
            getallCategory(){
                return this.$store.getters.getCategory
            }
        },
        methods:{
            deleteCategory(id){
                axios.get('/category/'+id)
                    .then(()=>{
                    this.$store.dispatch("allCategory")
                        Toast.fire({
                            type: 'success',
                            title: 'Category deleted Successfully'
                        })
                })
                    .catch(()=>{

                    })
            },
            deleteSelected(){
                console.log(this.categoryItem)
                axios.get('/deletecategory/'+this.categoryItem)
                    .then(()=>{
                        this.categoryItem = []
                        this.$store.dispatch("allCategory")
                        toast({
                            type: 'success',
                            title: 'Category Deleted successfully'
                        })

                    })
            },
            selectAll(){
                if(this.all_select==false){
                    this.all_select = true
                    for(var category in this.getallCategory){
                        this.categoryItem.push(this.getallCategory[category].id)
                    }
                }else{
                    this.all_select = false
                    this.categoryItem = []
                }


            }
        },
    }
</script>

<style scoped>

</style>