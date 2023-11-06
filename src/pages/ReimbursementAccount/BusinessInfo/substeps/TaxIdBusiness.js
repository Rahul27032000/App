import React from 'react';
import {withOnyx} from 'react-native-onyx';
import {View} from 'react-native';
import useLocalize from '../../../../hooks/useLocalize';
import styles from '../../../../styles/styles';
import Text from '../../../../components/Text';
import TextInput from '../../../../components/TextInput';
import CONST from '../../../../CONST';
import Form from '../../../../components/Form';
import ONYXKEYS from '../../../../ONYXKEYS';
import subStepPropTypes from '../../subStepPropTypes';
import * as ValidationUtils from '../../../../libs/ValidationUtils';
import {reimbursementAccountPropTypes} from '../../reimbursementAccountPropTypes';
import getDefaultStateForField from '../../utils/getDefaultStateForField';

const propTypes = {
    /** Reimbursement account from ONYX */
    reimbursementAccount: reimbursementAccountPropTypes.isRequired,

    ...subStepPropTypes,
};

const companyTaxIdKey = CONST.BANK_ACCOUNT.BUSINESS_INFO_STEP.INPUT_KEY.COMPANY_TAX_ID;

const validate = (values) => ValidationUtils.getFieldRequiredErrors(values, [companyTaxIdKey]);

function TaxIdBusiness({reimbursementAccount, onNext, isEditing}) {
    const {translate} = useLocalize();

    const defaultCompanyTaxId = getDefaultStateForField({reimbursementAccount, fieldName: companyTaxIdKey, defaultValue: ''});

    const bankAccountID = getDefaultStateForField({reimbursementAccount, fieldName: 'bankAccountID', defaultValue: 0});

    const shouldDisableCompanyTaxID = Boolean(bankAccountID && defaultCompanyTaxId);

    return (
        <Form
            formID={ONYXKEYS.REIMBURSEMENT_ACCOUNT}
            submitButtonText={isEditing ? translate('common.confirm') : translate('common.next')}
            validate={validate}
            onSubmit={onNext}
            style={[styles.mh5, styles.flexGrow1]}
            submitButtonStyles={[styles.pb5, styles.mb0]}
        >
            <View>
                <Text style={styles.textHeadline}>{translate('businessInfoStep.enterYourCompanysTaxIdNumber')}</Text>
                <TextInput
                    inputID={companyTaxIdKey}
                    label={translate('businessInfoStep.taxIDNumber')}
                    accessibilityLabel={translate('businessInfoStep.taxIDNumber')}
                    accessibilityRole={CONST.ACCESSIBILITY_ROLE.TEXT}
                    containerStyles={[styles.mt4]}
                    keyboardType={CONST.KEYBOARD_TYPE.NUMBER_PAD}
                    disabled={shouldDisableCompanyTaxID}
                    placeholder={translate('businessInfoStep.taxIDNumberPlaceholder')}
                    defaultValue={defaultCompanyTaxId}
                    shouldSaveDraft
                    shouldUseDefaultValue={shouldDisableCompanyTaxID}
                />
            </View>
        </Form>
    );
}

TaxIdBusiness.propTypes = propTypes;
TaxIdBusiness.displayName = 'TaxIdBusiness';

export default withOnyx({
    reimbursementAccount: {
        key: ONYXKEYS.REIMBURSEMENT_ACCOUNT,
    },
})(TaxIdBusiness);
