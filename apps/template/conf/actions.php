<?php

return array(
	'template' => array('mainPanel', 'template/main/main', 'templateIconForm', '', A_ACCESS, array(
		'item1' => array('Clientes', 'template/main/main2', 'templateIconForm', '', A_ACCESS, array(
			'subitem1' => array('Pesquisar', 'template/main/main', 'templateIconForm', '', A_ACCESS),
			'subitem2' => array('Inserir', 'template/main/main2', 'templateIconForm', '', A_ACCESS,array(
					'subitem21' => array('Básico', 'template/main/main', 'templateIconForm', '', A_ACCESS),
					'subitem22' => array('Detalhado', 'template/main/main', 'templateIconForm', '', A_ACCESS),
				)),
			'subitem3' => array('Ver últimos', 'template/main/main', 'templateIconForm', '', A_ACCESS),
			'subitem4' => array('Relatórios', 'template/main/main', 'templateIconForm', '', A_ACCESS),
			)),
		'item2' => array('Produtos', 'template/main/main', 'templateIconForm', '', A_ACCESS, array()),
		'item3' => array('Estoque', 'template/main/main', 'templateIconForm', '', A_ACCESS, array()),
		'item4' => array('Contas', 'template/main/main', 'templateIconForm', '', A_ACCESS, array()),
		'item5' => array('Sistema', 'template/main/main', 'templateIconForm', '', A_ACCESS, array()),
		))
	);

?>