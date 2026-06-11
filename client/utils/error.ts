import axios from "axios";
import { toast } from "sonner";

export default function handleError(error: unknown) {
    if (error instanceof Error && axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.msg);
        throw new Error(error.response.data.msg);
    } else {
        toast.error("Something went wrong");
        throw new Error("Something went wrong");
    }
}
