<template>
    <div>
        <section class="content mt-2">
            <div class="row justify-content-around">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Post List</h3>
                            <div class="card-tools">
                                <button class="btn btn-primary">
                                    <router-link to="/add-post" class="text-white">
                                        Add Post
                                    </router-link>
                                </button>
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <table id="example2" class="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>User</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Photo</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(post,index) in allPost">
                                    <td>{{index+1}}</td>
                                    <td v-if="post.user">{{post.user.name}}</td>
                                    <td v-if="post.category">{{post.category.cat_name}}</td>
                                    <td>{{post.title|sortlenght(20,"...")}}</td>
                                    <td>{{post.description|sortlenght(30,"...")}}</td>
                                    <td><img :src="ourImage(post.photo)" alt="" width="40" height="30"></td>
                                    <td>
                                        <router-link :to="`/edit-post/${post.id}`" class="badge badge-primary">Edit</router-link>
                                        <a href="" @click.prevent="deletePost(post.id)" class="badge badge-danger">Delete</a>
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
        name: "List",
        mounted(){
            this.$store.dispatch("getAllPost")
        },
        computed:{
            allPost(){
                return this.$store.getters.getAllPost
            }
        },
        methods:{
            ourImage(img){
                return "uploadImage/"+img;
            },
            deletePost(id){
                axios.get('/delete/'+id)
                    .then(()=>{
                        this.$store.dispatch("getAllPost");
                        Toast.fire({
                            type: 'success',
                            title: 'Post Deleted successfully'
                        })
                    })
                    .catch(()=>{

                    })
            }
        },
    }
</script>

<style scoped>

</style>