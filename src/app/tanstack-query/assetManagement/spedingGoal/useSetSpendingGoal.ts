import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys";
import { DOMAIN } from "@api/url";
import { getCookie } from "@app/utils/storage";
import { QUERY_KEY_SPENDING_GOAL } from "@constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setSpendingGoal } from "@app/types/asset.ts";

const fetchSetSpendingGoal = async (query: setSpendingGoal) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  return fetch(`${DOMAIN}/asset/spend-goal/set`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  });
};

export const useSetSpendingGoal = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchSetSpendingGoal,
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY_SPENDING_GOAL,
          variables.user_id,
          variables.start_date,
        ],
      });
    },
  });

  const setSpendingGoal = (query: setSpendingGoal) => {
    mutate(query);
  };

  return { setSpendingGoal };
};
