import { createClient } from "@/lib/supabase/server-props";

export const getServerSideProps = async (context) => {
  const supabase = createClient(context);

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const role = data.user.user_metadata.role;

  if (role === "creator") {
    return {
      redirect: {
        destination: "/quiz/manage",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/quiz/explore",
      permanent: false,
    },
  };
};

export default function Quiz() {
  return null;
}
