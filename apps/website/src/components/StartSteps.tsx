import styles from "@/utils/styles";

interface StartStepsProps {
  number: string;
  text: string;
}

const StartSteps = ({ number, text }: StartStepsProps) => (
  <div className={`${styles.flexCenter} flex-row`}>
    <div
      className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-muted-blue`}
    >
      <p className="font-bold text-[20px]">{number}</p>
    </div>
    <p className="flex-1 ml-[30px] font-normal text-[18px] text-muted-blue leading-[32.4px]">
      {text}
    </p>
  </div>
);

export default StartSteps;
