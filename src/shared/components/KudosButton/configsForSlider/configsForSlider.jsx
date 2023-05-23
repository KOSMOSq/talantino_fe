const configsForSlider = (fromWhatKudos, skillsAmount, balance) => {
    const step = skillsAmount ? skillsAmount : 1;

    const maxValue = skillsAmount
        ? skillsAmount + step > balance
            ? skillsAmount
            : Math.floor(balance / skillsAmount) * skillsAmount
        : balance;

    const minValue = skillsAmount
        ? skillsAmount === balance
            ? 0
            : skillsAmount + step > balance
            ? 0
            : skillsAmount
        : balance === 1
        ? 0
        : 1;

    const marksWithoutSkills = [
        { value: 1, label: 1 },
        { value: balance, label: balance }
    ];

    if (balance === 1) {
        marksWithoutSkills[0] = { value: 0, label: 0 };
    }

    const marksWithSkillsValue =
        skillsAmount === balance
            ? 0
            : skillsAmount + step > balance
            ? 0
            : skillsAmount;

    const marksWithSkills = [
        {
            value: marksWithSkillsValue,
            label: marksWithSkillsValue
        },
        { value: maxValue, label: maxValue }
    ];

    const marks = skillsAmount ? marksWithSkills : marksWithoutSkills;

    if (fromWhatKudos === "proof") {
        return { step, maxValue, minValue, marks };
    } else if (fromWhatKudos === "skill") {
    }
};

export { configsForSlider };
