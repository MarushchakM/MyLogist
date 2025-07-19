import {
  fetchTrailers,
  selectTrailerLoading,
  selectTrailersNumbersAndIds,
} from "@/lib/features/trailers/trailersSlice";
import {
  fetchTrucks,
  selectTruckNumbersAndIds,
  selectTrucksLoading,
} from "@/lib/features/trucks/trucksSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useMemo } from "react";
import { NavLink } from "../NavLink";
import { trailersPath, trucksPath } from "@/paths";
import style from "./SubMenu.module.scss";
import { Spinner } from "../Spinner";

type Props = {
  sectionId: "trucks" | "trailers";
};

export const SubMenu: React.FC<Props> = ({ sectionId }) => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => {
    switch (sectionId) {
      case "trucks":
        return selectTruckNumbersAndIds(state);
      case "trailers":
        return selectTrailersNumbersAndIds(state);
    }
  });

  const newNavLinks = useMemo(() => {
    if (!data) return [];
    return data.map((item) => {
      let href = "";
      const label = item.number;

      if (sectionId === "trucks") {
        href = `${trucksPath()}/${item.id}`;
      } else if (sectionId === "trailers") {
        href = `${trailersPath()}/${item.id}`;
      }
      return { href, label };
    });
  }, [data, sectionId]);

  const isLoading = useAppSelector((state) => {
    if (sectionId === "trucks") {
      return selectTrucksLoading(state);
    }

    if (sectionId === "trailers") {
      return selectTrailerLoading(state);
    }

    return false;
  });

  useEffect(() => {
    switch (sectionId) {
      case "trucks":
        dispatch(fetchTrucks());
        break;
      case "trailers":
        dispatch(fetchTrailers());
        break;
    }
  }, [sectionId]);

  return (
    <ul className={style.subMenu}>
      {isLoading ? (
        <li className={style.spinner}>
          <Spinner />
        </li>
      ) : (
        newNavLinks?.map((element) => (
          <li key={element.label}>
            <NavLink href={element.href}>{element.label}</NavLink>
          </li>
        ))
      )}
    </ul>
  );
};
