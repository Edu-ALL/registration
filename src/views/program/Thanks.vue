<template>
  <div id="thanks">
    <div class="container">
      <div class="row align-items-center justify-content-center" style="height: 100dvh">
        <div class="text-center col-md-8">
          <div class="card border-0 shadow">
            <div class="card-body bg-primary text-white">
              <div class="row align-items-center">
                <div :class="status == 'pra-reg' ? 'col-md-7' : 'col-md-12'">
                  <img src="/img/check.png" alt="completed" width="10%" class="mb-4" />
                  <h3>
                    Hi, {{ client?.data?.first_name }} {{ client?.data?.last_name }}
                  </h3>
                  <h4 class="mb-4 mt-4">
                    <span>
                      Thank You <br />
                      For Submitting Your Form!
                    </span>
                  </h4>
                  <p>
                    You will receive a confirmation email and our team will contact you
                    shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import ClientProgramService from "@/services/ClientProgramService";

export default defineComponent({
  name: "thank-program",
  setup() {
    const client = ref();

    onMounted(() => {
      client.value = ClientProgramService.getClientProgram();
    });

    return {
      client,
    };
  },
});
</script>
