import { useEffect } from "react";
import { getKitties } from ".";
import { useAppDispatch } from "../../app/hooks";

type UseRefreshKittiesListProps = {
  intervalMilliseconds?: number;
  accountKey?: string;
};

/**
 * Custom hook to refresh the kitties list at a given interval.
 * 
 * If no interval is provided, the kitties list will only refresh once.
 * Specify an account key to get the kitties owned by that account.
 */
export const useRefreshKittiesList = ({ intervalMilliseconds, accountKey }: UseRefreshKittiesListProps = {}) => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getKitties(accountKey));

    if (!intervalMilliseconds || intervalMilliseconds <= 0) return;
    
    const interval = setInterval(() => {
      dispatch(getKitties(accountKey));
    }, intervalMilliseconds);

    return () => clearInterval(interval);
  }, [dispatch, intervalMilliseconds, accountKey]);
}
