<script>
import { check } from "@/utils/auth";
export default {
  functional: true,
  props: {
    auth: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    return check(props.auth) ? scopedSlots.default() : null;
  }
};
</script>
