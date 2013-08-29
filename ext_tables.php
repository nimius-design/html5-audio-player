<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
	$_EXTKEY,
	'Nimhtml5audioplayer',
	'nim_html5-audio-player'
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'NIMIUS HTML5 Audio Player');

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr('tx_nimhtml5audioplayer_domain_model_song', 'EXT:nim_html5audioplayer/Resources/Private/Language/locallang_csh_tx_nimhtml5audioplayer_domain_model_song.xlf');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_nimhtml5audioplayer_domain_model_song');
$TCA['tx_nimhtml5audioplayer_domain_model_song'] = array(
	'ctrl' => array(
		'title'	=> 'LLL:EXT:nim_html5audioplayer/Resources/Private/Language/locallang_db.xlf:tx_nimhtml5audioplayer_domain_model_song',
		'label' => 'name',
		'tstamp' => 'tstamp',
		'crdate' => 'crdate',
		'cruser_id' => 'cruser_id',
		'dividers2tabs' => TRUE,
		'sortby' => 'sorting',
		'versioningWS' => 2,
		'versioning_followPages' => TRUE,
		'origUid' => 't3_origuid',
		'languageField' => 'sys_language_uid',
		'transOrigPointerField' => 'l10n_parent',
		'transOrigDiffSourceField' => 'l10n_diffsource',
		'delete' => 'deleted',
		'enablecolumns' => array(
			'disabled' => 'hidden',
			'starttime' => 'starttime',
			'endtime' => 'endtime',
		),
		'searchFields' => 'name,mp3,ogg,',
		'dynamicConfigFile' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Configuration/TCA/Song.php',
		'iconfile' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($_EXTKEY) . 'Resources/Public/Icons/tx_nimhtml5audioplayer_domain_model_song.gif'
	),
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr('tx_nimhtml5audioplayer_domain_model_mp3', 'EXT:nim_html5audioplayer/Resources/Private/Language/locallang_csh_tx_nimhtml5audioplayer_domain_model_mp3.xlf');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_nimhtml5audioplayer_domain_model_mp3');
$TCA['tx_nimhtml5audioplayer_domain_model_mp3'] = array(
	'ctrl' => array(
		'title'	=> 'LLL:EXT:nim_html5audioplayer/Resources/Private/Language/locallang_db.xlf:tx_nimhtml5audioplayer_domain_model_mp3',
		'label' => 'mp3',
		'tstamp' => 'tstamp',
		'crdate' => 'crdate',
		'cruser_id' => 'cruser_id',
		'dividers2tabs' => TRUE,

		'versioningWS' => 2,
		'versioning_followPages' => TRUE,
		'origUid' => 't3_origuid',
		'languageField' => 'sys_language_uid',
		'transOrigPointerField' => 'l10n_parent',
		'transOrigDiffSourceField' => 'l10n_diffsource',
		'delete' => 'deleted',
		'enablecolumns' => array(
			'disabled' => 'hidden',
			'starttime' => 'starttime',
			'endtime' => 'endtime',
		),
		'searchFields' => 'mp3,',
		'dynamicConfigFile' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Configuration/TCA/Mp3.php',
		'iconfile' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($_EXTKEY) . 'Resources/Public/Icons/tx_nimhtml5audioplayer_domain_model_mp3.gif'
	),
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr('tx_nimhtml5audioplayer_domain_model_ogg', 'EXT:nim_html5audioplayer/Resources/Private/Language/locallang_csh_tx_nimhtml5audioplayer_domain_model_ogg.xlf');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_nimhtml5audioplayer_domain_model_ogg');
$TCA['tx_nimhtml5audioplayer_domain_model_ogg'] = array(
	'ctrl' => array(
		'title'	=> 'LLL:EXT:nim_html5audioplayer/Resources/Private/Language/locallang_db.xlf:tx_nimhtml5audioplayer_domain_model_ogg',
		'label' => 'ogg',
		'tstamp' => 'tstamp',
		'crdate' => 'crdate',
		'cruser_id' => 'cruser_id',
		'dividers2tabs' => TRUE,

		'versioningWS' => 2,
		'versioning_followPages' => TRUE,
		'origUid' => 't3_origuid',
		'languageField' => 'sys_language_uid',
		'transOrigPointerField' => 'l10n_parent',
		'transOrigDiffSourceField' => 'l10n_diffsource',
		'delete' => 'deleted',
		'enablecolumns' => array(
			'disabled' => 'hidden',
			'starttime' => 'starttime',
			'endtime' => 'endtime',
		),
		'searchFields' => 'ogg,',
		'dynamicConfigFile' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Configuration/TCA/Ogg.php',
		'iconfile' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($_EXTKEY) . 'Resources/Public/Icons/tx_nimhtml5audioplayer_domain_model_ogg.gif'
	),
);

?>