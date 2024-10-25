import React from "react";

import qs from 'qs'
import { Filters } from "./use-filters";
import { useRouter } from 'next/navigation'


export const useQueryFilters = (filters: Filters) => {
    const isMounted = React.useRef(false);
    const router = useRouter();

    React.useEffect(() => {
       if (isMounted.current) {
        const params = {
          ...filters.prices
        };
    
        const query = qs.stringify(params, {
          arrayFormat: 'comma'
        })
    
        router.push(`?${query}`, {
          scroll: false
        });

        console.log(filters, 999)
       }

      isMounted.current = true

      }, [filters])
}