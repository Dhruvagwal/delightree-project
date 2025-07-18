import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  INPUT_COLOR,
  PRIMARY_COLOR,
  SCREEN_PADDING,
  TEXT_COLOR,
} from '../../styles/global';
import { form_styles } from '../auth/styles';

interface MultiStepperProps {
  steps: string[];
  children: React.ReactNode[];
  onFinish: () => void;
  onStepNext?: (stepIndex: number) => Promise<boolean>; // validation hook per step
}

const MultiStepper: React.FC<MultiStepperProps> = ({
  steps,
  children,
  onFinish,
  onStepNext,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = children.length;

  const next = async () => {
    const valid = onStepNext ? await onStepNext(currentStep) : true;
    if (valid && currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const renderStepper = () => (
    <View style={styles.stepperContainer}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              styles.circle,
              index === currentStep
                ? styles.activeCircle
                : index < currentStep
                ? styles.doneCircle
                : styles.inactiveCircle,
            ]}
          >
            <Text style={styles.circleText}>{index + 1}</Text>
            <Text style={styles.label}>{step}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View>
      {renderStepper()}

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {children[currentStep]}
      </ScrollView>

      <View style={styles.buttons}>
        {currentStep > 0 && (
          <TouchableOpacity style={form_styles.button} onPress={back}>
            <Text style={form_styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {currentStep < totalSteps - 1 ? (
          <TouchableOpacity style={form_styles.button} onPress={next}>
            <Text style={form_styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={form_styles.button} onPress={onFinish}>
            <Text style={form_styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MultiStepper;

const styles = StyleSheet.create({
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 5,
  },
  stepContainer: {
    alignItems: 'center',

    flex: 1,
  },
  circle: {
    justifyContent: 'center',
    gap: 5,
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  activeCircle: {
    backgroundColor: '#4C0660',
    // backgroundColor: '#FFAD4A',
  },
  doneCircle: {
    backgroundColor: '#FFAD4A',
    // backgroundColor: '#FB2A52',
  },
  inactiveCircle: {
    backgroundColor: '#FB2A52',
    // backgroundColor: '#4C0660',
  },
  circleText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: TEXT_COLOR,
  },
  label: {
    fontSize: 12,
    color: TEXT_COLOR,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SCREEN_PADDING,
    gap: 10,
  },
});
