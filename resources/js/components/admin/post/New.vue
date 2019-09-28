<template>
    <div>
        <section class="content">
            <div class="container-fluid mt-2">
                <div class="row justify-content-around">
                    <!-- left column -->
                    <div class="col-md-8">
                        <!-- general form elements -->
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title text-center">Add New Post</h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form role="form" enctype="multipart/form-data" @submit.prevent="addnewPost()">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="postId">Add Post</label>
                                        <input type="text" class="form-control" id="postId" placeholder="Add New Post"
                                               v-model="form.title" name="title"
                                               :class="{ 'is-invalid': form.errors.has('title') }">
                                        <has-error :form="form" field="title"></has-error>
                                    </div>
                                    <div class="form-group">
                                        <label for="descriptionId">Add description</label>
                                        <markdown-editor v-model="form.description"></markdown-editor>
                                        <has-error :form="form" field="description"></has-error>
                                    </div>
                                    <div class="form-group">
                                        <label>Select Category</label>
                                        <select class="form-control"
                                                :class="{ 'is-invalid': form.errors.has('cat_id') }"
                                                v-model="form.cat_id">
                                            <option disabled value="">Select One</option>
                                            <option :value="category.id" v-for="category in getallCategory">
                                                {{category.cat_name}}
                                            </option>
                                        </select>
                                        <has-error :form="form" field="cat_id"></has-error>
                                    </div>

                                    <div class="form-group">
                                        <input type="file" @change="changePhoto($event)" name="photo"
                                               :class="{ 'is-invalid': form.errors.has('photo') }">
                                        <img :src="form.photo" alt="" width="60" height="40">
                                        <has-error :form="form" field="photo"></has-error>
                                    </div>
                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">Save</button>
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
        name: "New",
        data() {
            return {
                form: new Form({
                    title: '',
                    description: '',
                    cat_id: '',
                    photo: ''
                })
            }
        },
        mounted() {
            this.$store.dispatch("allCategory")
        },
        computed: {
            getallCategory() {
                return this.$store.getters.getCategory
            }
        },
        methods: {
            changePhoto(event) {
                let file = event.target.files[0];
                if (file.size>1048576) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                } else {
                    let reader = new FileReader();
                    reader.onload = event => {
                        this.form.photo = event.target.result
                        console.log(event.target.result)
                    };
                    reader.readAsDataURL(file);
                }

            },
            addnewPost() {
                this.form.post('/savepost')
                    .then(() => {
                        this.$router.push('/post-list')
                        Toast.fire({
                            type: 'success',
                            title: 'Post Added Successfully'
                        })
                    })
                    .catch(() => {

                    })
            }
        }
    }
</script>

<style scoped>

</style>