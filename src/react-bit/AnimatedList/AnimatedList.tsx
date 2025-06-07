/*
	Installed from https://reactbits.dev/ts/default/
*/

import React, {
  useRef,
  useState,
  ReactNode,
  MouseEventHandler,
  UIEvent,
} from "react";
import { motion, useInView } from "framer-motion";
import "./AnimatedList.css";

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ marginBottom: "1rem", cursor: "pointer" }}
    >
      {children}
    </motion.div>
  );
};

interface ItemData {
  texto: string;
  estado: string;
  foto_url?: string;
}

interface AnimatedListProps {
  items: ItemData[];
  onItemSelect?: (item: ItemData, index: number) => void;
  showGradients?: boolean;
  className?: string;
  displayScrollbar?: boolean;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  onItemSelect,
  showGradients = true,
  className = "",
  displayScrollbar = true,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  };

  return (
    <div className={`scroll-list-container ${className}`}>
      <div
        ref={listRef}
        className={`scroll-list ${!displayScrollbar ? "no-scrollbar" : ""}`}
        onScroll={handleScroll}
      >
        {items.map((item, index) => {
          let bgClass = "bg-gris";
          if (item.estado === "verificado") {
            bgClass = "bg-verde";
          } else if (item.estado === "no_verificado") {
            bgClass = "bg-rojo";
          }

          return (
            <AnimatedItem
              key={index}
              delay={0.1}
              index={index}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => {
                setSelectedIndex(index);
                if (onItemSelect) {
                  onItemSelect(item, index);
                }
              }}
            >
              <div className={`item ${bgClass} flex items-center gap-3`}>
                {item.foto_url && (
                  <img
                    src={item.foto_url}
                    alt={item.texto}
                    className="w-35 h-35 object-cover rounded-xl "
                  />
                )}
                <p className="item-text font-semibold text-blue-900 text-base">
                  {item.texto}
                </p>
              </div>
            </AnimatedItem>
          );
        })}
      </div>
      {showGradients && (
        <>
          <div
            className="top-gradient"
            style={{ opacity: topGradientOpacity }}
          ></div>
          <div
            className="bottom-gradient"
            style={{ opacity: bottomGradientOpacity }}
          ></div>
        </>
      )}
    </div>
  );
};

export default AnimatedList;
