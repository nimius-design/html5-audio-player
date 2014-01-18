<?php
namespace TYPO3\NimHtml5audioplayer\Domain\Model;

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2013 NIMIUS HTML5 Audio Player <nicki@nimius.net>, NIMIUS
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

/**
 *
 *
 * @package nim_html5audioplayer
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 */
class Song extends \TYPO3\CMS\Extbase\DomainObject\AbstractEntity {

	/**
	 * name
	 *
	 * @var \string
	 */
	protected $name;

	/**
	 * mp3
	 *
	 * @var \TYPO3\NimHtml5audioplayer\Domain\Model\Mp3
	 */
	protected $mp3;

	/**
	 * ogg
	 *
	 * @var \TYPO3\NimHtml5audioplayer\Domain\Model\Ogg
	 */
	protected $ogg;

	/**
	 * Returns the name
	 *
	 * @return \string $name
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * Returns the mp3
	 *
	 * @return \TYPO3\NimHtml5audioplayer\Domain\Model\Mp3 $mp3
	 */
	public function getMp3() {
		return $this->mp3;
	}

	/**
	 * Returns the ogg
	 *
	 * @return \TYPO3\NimHtml5audioplayer\Domain\Model\Ogg $ogg
	 */
	public function getOgg() {
		return $this->ogg;
	}

}
?>