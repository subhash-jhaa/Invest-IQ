import { useMotionValue, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CountUp = ({ to, suffix = "", duration = 5 }) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });

      return controls.stop;
    }
  }, [isInView, to, duration, count]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

export default CountUp;
