export default defineConfig({
	// plugins: [react()],
	server: {
	  host: true,
	  port: 8000, // This is the port which we will use in docker
	  // add the next lines if you're using windows and hot reload doesn't work
	//    watch: {
	// 	 usePolling: true
	//    }
	}
   })
