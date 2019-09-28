<template>
    <div>
        <section class="content">
            <div class="container-fluid mt-2">
                <div class="row justify-content-around">
                    <!-- left column -->
                    <div class="col-md-6">
                        <!-- general form elements -->
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title text-center">Edit Category</h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form role="form" @submit.prevent="updateCategory()">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="categoryId">Edit Category</label>
                                        <input type="text" class="form-control" id="categoryId" placeholder="Add New Category"
                                               v-model="form.cat_name" name="cat_name" :class="{ 'is-invalid': form.errors.has('cat_name') }">
                                        <has-error :form="form" field="cat_name"></has-error>
                                    </div>
                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Edit",
        mounted(){
            axios.get(`/editcategory/${this.$route.params.categoryId}`)
                .then((response)=>{
                    this.form.fill(response.data.category)
                })
        },
        data(){
            return{
                form: new Form({
                    'cat_name':''
                })
            }
        },
        methods:{
            updateCategory(){
                this.form.post(`/update-category/${this.$route.params.categoryId}`)
                    .then((response)=>{
                        this.$router.push('/category-list')
                        Toast.fire({
                            type: 'success',
                            title: 'Category Updated Successfully'
                        })
                    })
                    .catch(()=>{

                    })
            }
        }
    }
</script>

<style scoped>

</style>