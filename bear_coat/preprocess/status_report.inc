<?php

/**
 * @file
 * Contains status report theme and related functions.
 */

/**
 * Implements theme_status_report().
 */
function semanticui_status_report($variables) {
  $requirements = $variables['requirements'];
  $severities = array(
    REQUIREMENT_INFO => array(
      'title' => t('Info'),
      'class' => 'positive',
      'icon' => '<i class="info icon"></i>',
    ),
    REQUIREMENT_OK => array(
      'title' => t('OK'),
      'class' => 'positive',
      'icon' => '<i class="checkmark icon"></i>',
    ),
    REQUIREMENT_WARNING => array(
      'title' => t('Warning'),
      'class' => 'warning',
      'icon' => '<i class="warning icon"></i>',
    ),
    REQUIREMENT_ERROR => array(
      'title' => t('Error'),
      'class' => 'error',
      'icon' => '<i class="remove icon"></i>',
    ),
  );
  $output = '<table class="ui table system-status-report-table">';

  foreach ($requirements as $requirement) {
    if (empty($requirement['#type'])) {
      $severity = $severities[isset($requirement['severity']) ? (int) $requirement['severity'] : REQUIREMENT_OK];
      $severity['icon'] = '<span title="' . $severity['title'] . '">' . $severity['icon'] . '<span class="element-invisible">' . $severity['title'] . '</span></span>';

      // Output table row(s)
      if (!empty($requirement['description'])) {
        $output .= '<tr class="' . $severity['class'] . ' merge-down">';
        $output .= '<td class="status-icon collapsing">' . $severity['icon'] . '</td>';
        $output .= '<td class="status-title">' . $requirement['title'] . '</td>';
        $output .= '<td class="status-value">' . $requirement['value'] . '</td>';
        $output .= '</tr>';

        $output .= '<tr class="' . $severity['class'] . ' merge-up">';
        $output .= '<td colspan="3" class="status-description">' . $requirement['description'] . '</td>';
        $output .= '</tr>';
      }
      else {
        $output .= '<tr class="' . $severity['class'] . '">';
        $output .= '<td class="status-icon collapsing">' . $severity['icon'] . '</td>';
        $output .= '<td class="status-title">' . $requirement['title'] . '</td>';
        $output .= '<td class="status-value">' . $requirement['value'] . '</td>';
        $output .= '</tr>';
      }
    }
  }

  $output .= '</table>';
  return $output;
}
